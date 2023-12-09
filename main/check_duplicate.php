<?php

$mysqli = require __DIR__ . "\conn.php";

if (isset($_POST['username'])) {
    $username = $_POST['username'];

    $stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    echo ($count > 0) ? 'exists' : 'available';
} elseif (isset($_POST['email'])) {
    $email = $_POST['email'];

    $stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    echo ($count > 0) ? 'exists' : 'available';
} else {
    echo 'invalid_request';
}

?>
