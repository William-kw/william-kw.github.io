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

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

$send = mail($destinataire, $sujet, $corpsMail, $headers);
if ($send) {
    echo "succes";
} else {
    echo "error";
}
