<?php
if (isset($_POST["nom"]) && isset($_POST["email"]) && isset($_POST["tel"]) && isset($_POST["message"])) {
    if (!empty($nom) && !empty($email) && !empty($tel) && !empty($message)) {
        $nom = htmlspecialchars($_POST["nom"]);
        $email = htmlspecialchars($_POST["email"]);
        $tel = htmlspecialchars($_POST["tel"]);
        $message = htmlspecialchars($_POST["message"]);
    } else echo "vide";
}

// echo "send.php";