<?php
require __DIR__ . '/config.php';

ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-type: application/json; charset=UTF-8');
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
$phone = cleanValue($_POST['phone'] ?? '');
$email = cleanValue($_POST['email'] ?? '');
$messageText = cleanValue($_POST['message'] ?? '');

$errors = [];

if ($serviceType === '') {
	$errors[] = 'Не выбрана услуга.';
}
if ($name === '') {
	$errors[] = 'Не указано имя.';
}
if ($desiredDate === '') {
	$errors[] = 'Не выбрана дата.';
}
if ($phone === '') {
	$errors[] = 'Не указан телефон.';
} else {
	$phoneDigits = preg_replace('/\D+/', '', $phone);
	if (strlen($phoneDigits) < 11) {
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
		'message' => implode(' ', $errors),
	]);
	exit;
}

try {
	$mail->setFrom($mail->Username, 'Шепот внутри');
	$mail->addAddress('yaniarz89@gmail.com');
	$mail->Subject = 'Новая заявка на консультацию';

	$body = '<h1>Новая заявка с сайта</h1>';
	$body .= '<p><strong>Услуга:</strong> ' . $serviceType . '</p>';
	$body .= '<p><strong>Имя:</strong> ' . $name . '</p>';
	$body .= '<p><strong>Желаемая дата:</strong> ' . $desiredDate . '</p>';
	$body .= '<p><strong>Телефон:</strong> ' . $phone . '</p>';
	$body .= '<p><strong>Email:</strong> ' . $email . '</p>';
	if ($messageText !== '') {
		$body .= '<p><strong>Сообщение:</strong><br>' . nl2br($messageText) . '</p>';
	}

	$mail->Body = $body;
	$mail->send();
	$responseMessage = 'Заявка отправлена. Спасибо!';
} catch (Throwable $e) {
	$responseMessage = 'Не удалось отправить заявку. Проверьте настройки SMTP.';
}

restore_error_handler();
if (ob_get_length()) {
	ob_clean();
}
echo json_encode([
	'message' => $responseMessage,
]);