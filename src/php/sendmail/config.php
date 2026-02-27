<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

function loadDotEnv(string $path): void
{
	if (!is_readable($path)) {
		return;
	}

	$lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	if ($lines === false) {
		return;
	}

	foreach ($lines as $line) {
		$line = trim($line);
		if ($line === '' || str_starts_with($line, '#')) {
			continue;
		}
		$pos = strpos($line, '=');
		if ($pos === false) {
			continue;
		}

		$key = trim(substr($line, 0, $pos));
		$value = trim(substr($line, $pos + 1));

		if ($key === '') {
			continue;
		}
		if (
			(strlen($value) >= 2) &&
			(($value[0] === '"' && $value[strlen($value) - 1] === '"') ||
			($value[0] === "'" && $value[strlen($value) - 1] === "'"))
		) {
			$value = substr($value, 1, -1);
		}

		putenv($key . '=' . $value);
		$_ENV[$key] = $value;
	}
}

$envCandidates = [
	__DIR__ . '/../../../.env',
	__DIR__ . '/.env',
	__DIR__ . '/../.env',
];
foreach ($envCandidates as $envPath) {
	loadDotEnv($envPath);
}

$smtpHost = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
$smtpPort = (int) (getenv('SMTP_PORT') ?: 587);
$smtpEncryption = strtolower((string) (getenv('SMTP_ENCRYPTION') ?: 'starttls'));
$smtpUsername = (string) (getenv('SMTP_USERNAME') ?: '');
$smtpPassword = preg_replace('/\s+/', '', (string) (getenv('SMTP_PASSWORD') ?: ''));

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('uk', __DIR__ . '/phpmailer/language/');
$mail->isHTML(true);

$mail->isSMTP();
$mail->Host = $smtpHost;
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
if ($smtpEncryption === 'smtps' || $smtpEncryption === 'ssl') {
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
} elseif ($smtpEncryption === 'starttls' || $smtpEncryption === 'tls') {
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
} else {
	$mail->SMTPSecure = false;
	$mail->SMTPAutoTLS = false;
}
$mail->Port = $smtpPort;
$mail->Timeout = 30;
