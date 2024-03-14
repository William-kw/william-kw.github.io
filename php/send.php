<?php
$nom = htmlspecialchars($_POST["nom"]);
$email = htmlspecialchars($_POST["email"]);
$tel = htmlspecialchars($_POST["tel"]);
$message = htmlspecialchars($_POST["message"]);

$destinataire = "williamkenfack4@gmail.com";
$sujet = "Nouveau mail de $nom";

$corpsMail = "Nom: $nom\n";
$corpsMail .= "Email: $email\n";
$corpsMail .= "Téléphone: $tel\n\n";
$corpsMail .= "Message:\n$message";

$headers = "De: $email\r\n";

$send = mail($destinataire, $sujet, $corpsMail, $headers);
if ($send) {
    echo "succes";
}

use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Host = 'smtp.hostinger.fr';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'test@hostinger-tutorials.fr';
$mail->Password = 'VOTRE MOT DE PASSE ICI';
$mail->setFrom('test@hostinger-tutorials.fr', 'Votre nom');
$mail->addReplyTo('test@hostinger-tutorials.fr', 'Votre nom');
$mail->addAddress('exemple@gmail.com', 'Nom du destinataire');
$mail->Subject = 'Essai de PHPMailer';
$mail->msgHTML(file_get_contents('message.html'), __DIR__);
$mail->Body = 'Ceci est le contenu du message en texte clair';
//$mail->addAttachment('test.txt');
if ($mail->send()) {
    echo "succes";
} else {
    echo 'Erreur de Mailer : ' . $mail->ErrorInfo;
}