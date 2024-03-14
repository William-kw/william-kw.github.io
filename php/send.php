<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$nom = htmlspecialchars($_POST["nom"]);
$email = htmlspecialchars($_POST["email"]);
$tel = htmlspecialchars($_POST["tel"]);
$message = htmlspecialchars($_POST["message"]);

$sujet = "Nouveau mail de $nom";

$corpsMail = "Nom: $nom\n";
$corpsMail .= "Email: $email\n";
$corpsMail .= "Téléphone: $tel\n\n";
$corpsMail .= "Message:\n$message";

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
    $mail->isSMTP();                                         
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'williamkenfack4@gmail.com';
    $mail->Password   = 'dkniadggonyofmlr';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($email, $nom);
    $mail->addAddress('williamkenfack4@gmail.com', 'William-kw');

    $mail->isHTML(true);
    $mail->Subject = $sujet;
    $mail->Body    = $corpsMail;

    $mail->send();
    echo 'succes';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}