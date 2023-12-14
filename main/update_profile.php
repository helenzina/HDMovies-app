<?php
session_start();

if (empty($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$mysqli = require __DIR__ . "/conn.php";

if (isset($_POST['saveChanges'])) {
    // Handle password update
    $newPassword = $_POST['password'];
    $repeatPassword = $_POST['repeatpassword'];

    // Check if the password fields are not empty
    if (!empty($newPassword) && !empty($repeatPassword)) {
        // Update password in the database
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordSql = "UPDATE users SET password_hash = ? WHERE id = ?";
        $updatePasswordStmt = $mysqli->prepare($updatePasswordSql);
        $updatePasswordStmt->bind_param("si", $hashedNewPassword, $_SESSION['user_id']);
        $updatePasswordStmt->execute();
        $updatePasswordStmt->close();
    }

    // Redirect back to the profile page or wherever you want
    header("Location: profile.php");
    exit();
}
?>
