<?php
require __DIR__ . '/config.php';

ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-type: application/json; charset=UTF-8');

// Basic CORS support for frontend hosted on a different domain (e.g. GitHub Pages)
$allowedOriginsRaw = trim((string) (getenv('CORS_ALLOWED_ORIGINS') ?: ''));
$allowedOrigins = array_values(array_filter(array_map('trim', explode(',', $allowedOriginsRaw))));
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($requestOrigin !== '') {
	if (in_array('*', $allowedOrigins, true)) {
		header('Access-Control-Allow-Origin: *');
	} elseif (in_array($requestOrigin, $allowedOrigins, true)) {
		header('Access-Control-Allow-Origin: ' . $requestOrigin);
		header('Vary: Origin');
	}
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
	http_response_code(204);
	exit;
}

ob_start();

set_error_handler(static function ($severity, $message, $file, $line) {
	throw new ErrorException($message, 0, $severity, $file, $line);
});

function cleanValue($value)
{
	return htmlspecialchars(trim((string) $value));
}

$serviceType = cleanValue($_POST['service_type'] ?? '');
$name = cleanValue($_POST['name'] ?? '');
$desiredDate = cleanValue($_POST['desired_date'] ?? '');
$phoneCode = cleanValue($_POST['phone_code'] ?? '');
$phone = cleanValue($_POST['phone'] ?? '');
$email = cleanValue($_POST['email'] ?? '');
$messageText = cleanValue($_POST['message'] ?? '');

$errors = [];
$phoneDigitsByCode = [
	'+7' => 11,
	'+380' => 12,
	'+375' => 12,
	'+1' => 11,
	'+44' => 12,
	'+49' => 13,
	'+33' => 11,
	'+34' => 11,
	'+39' => 12,
	'+48' => 11,
];

function parseDesiredDate(string $value): ?DateTimeImmutable
{
	$value = trim($value);
	if ($value === '') {
		return null;
	}

	$formats = ['d.m.Y', 'd/m/Y', 'd-m-Y', 'm/d/Y', 'Y-m-d'];
	foreach ($formats as $format) {
		$parsed = DateTimeImmutable::createFromFormat($format, $value);
		$errors = DateTimeImmutable::getLastErrors();
		$hasErrors = is_array($errors) && (($errors['warning_count'] ?? 0) > 0 || ($errors['error_count'] ?? 0) > 0);
		if ($parsed instanceof DateTimeImmutable && !$hasErrors) {
			return $parsed->setTime(0, 0, 0);
		}
	}

	try {
		return (new DateTimeImmutable($value))->setTime(0, 0, 0);
	} catch (Throwable $e) {
		return null;
	}
}

if ($serviceType === '') {
	$errors[] = 'Не выбрана услуга.';
}
if ($name === '') {
	$errors[] = 'Не указано имя.';
} elseif (!preg_match('/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/u', $name)) {
	$errors[] = 'Имя может содержать только буквы и пробелы.';
}
if ($desiredDate === '') {
	$errors[] = 'Не выбрана дата.';
} else {
	$parsedDesiredDate = parseDesiredDate($desiredDate);
	if ($parsedDesiredDate === null) {
		$errors[] = 'Дата указана некорректно.';
	} else {
		$today = new DateTimeImmutable('today');
		if ($parsedDesiredDate < $today) {
			$errors[] = 'Дата не может быть в прошлом.';
		}
	}
}
if ($phoneCode === '' || !array_key_exists($phoneCode, $phoneDigitsByCode)) {
	$errors[] = 'Не выбран код страны.';
}
if ($phone === '') {
	$errors[] = 'Не указан телефон.';
} else {
	$phoneDigits = preg_replace('/\D+/', '', $phone);
	$codeDigits = preg_replace('/\D+/', '', $phoneCode);
	$expectedLength = $phoneDigitsByCode[$phoneCode] ?? null;

	if ($expectedLength === null || strpos($phoneDigits, $codeDigits) !== 0 || strlen($phoneDigits) !== $expectedLength) {
		$errors[] = 'Телефон указан некорректно.';
	}
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$errors[] = 'Email указан некорректно.';
}

if (!empty($errors)) {
	if (ob_get_length()) {
		ob_clean();
	}
	restore_error_handler();
	echo json_encode([
		'success' => false,
		'message' => implode(' ', $errors),
	]);
	exit;
}

try {
	$fromName = getenv('SMTP_FROM_NAME') ?: 'Шепот внутри';
	$toEmail = getenv('SMTP_TO') ?: $mail->Username;
	$mailSubject = getenv('SMTP_SUBJECT') ?: 'Новая заявка на консультацию';

	$mail->setFrom($mail->Username, $fromName);
	$mail->addAddress($toEmail);
	$mail->Subject = $mailSubject;

	$body = '<h1>Новая заявка с сайта</h1>';
	$body .= '<p><strong>Услуга:</strong> ' . $serviceType . '</p>';
	$body .= '<p><strong>Имя:</strong> ' . $name . '</p>';
	$body .= '<p><strong>Желаемая дата:</strong> ' . $desiredDate . '</p>';
	$body .= '<p><strong>Код страны:</strong> ' . $phoneCode . '</p>';
	$body .= '<p><strong>Телефон:</strong> ' . $phone . '</p>';
	$body .= '<p><strong>Email:</strong> ' . $email . '</p>';
	if ($messageText !== '') {
		$body .= '<p><strong>Сообщение:</strong><br>' . nl2br($messageText) . '</p>';
	}

	$mail->Body = $body;
	$mail->send();
	$responseSuccess = true;
	$responseMessage = 'Заявка отправлена. Спасибо!';
} catch (Throwable $e) {
	$responseSuccess = false;
	$responseMessage = 'Не удалось отправить заявку. SMTP: ' . ($mail->ErrorInfo ?: $e->getMessage());
}

restore_error_handler();
if (ob_get_length()) {
	ob_clean();
}
echo json_encode([
	'success' => $responseSuccess,
	'message' => $responseMessage,
]);
