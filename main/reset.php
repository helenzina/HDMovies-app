<?php
$mysqli = require __DIR__ . "/conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reset'])) {

    $token = $_GET["token"];
    $token_hash = hash("sha256", $token);

    $sql = "SELECT * FROM users WHERE reset_token_hash = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $token_hash);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $newPassword = $_POST['newpassword'];
    $confirmPassword = $_POST['confirmnewpassword'];

    if (!empty($newPassword) && !empty($confirmPassword)) {
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordSql = "UPDATE users SET password_hash = ?, reset_token_hash = NULL, reset_token_expiration = NULL WHERE id = ?";
        $updatePasswordStmt = $mysqli->prepare($updatePasswordSql);
        $updatePasswordStmt->bind_param("si", $hashedNewPassword, $user["id"]);
        $updatePasswordStmt->execute();
        $updatePasswordStmt->close();
    }

    if ($user === null) {
        echo '<script>alert("Token not found.")</script>';
    } else if (strtotime($user["reset_token_expiration"]) <= time()) {
        echo '<script>alert("Token has expired.")</script>';
    } else {
        echo '<script>alert("Password was reseted successfully. You can now login.")</script>';
        header("Location: login.php");
        exit();
    }

}

?>

<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="icon" type="/images/logo.png" href="../images/logo.png" />

    <title>HDMovies - Watch TV Shows Online, Watch Movies Online</title>

    <link rel="stylesheet" href="../css/login.css">

</head>

<body>
    <header>
        <div class="login-top nav container">
            <a href="login.php" class="logo">
                <img src="../images/logotext red.png" alt="">
            </a>
        </div>
    </header>


    <div class="d-flex justify-content-center align-items-center container">
        <section class="login-box">
            <h2 class="text-white">Reset password</h2>
            <form class="mt-4" method="post">
                <div class="mb-3 bg-white rounded px-2">
                    <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>" />
                </div>

                <div class="mb-3 bg-white rounded px-2">
                    <label for="password" class="form-label small-text">New password</label>
                    <input type="password" title="Password must be at least 8 characters." pattern="[a-zA-Z0-9]{8,}"
                        name="newpassword" required onChange="onChangePass()" class="form-control border-0 p-0"
                        id="newpassword" aria-describedby="newPasswordHelp" />
                </div>

                <div class="mb-3 bg-white rounded px-2">
                    <label for="confirmnewpassword" class="form-label small-text">Confirm new password</label>
                    <input type="password" name="confirmnewpassword" required onChange="onChangePass()"
                        class="form-control border-0 p-0" id="confirmnewpassword"
                        aria-describedby="confirmNewPasswordHelp" />
                </div>

                <button type="submit" name="reset" class="btn btn-danger mt-3">Reset Password</button>

            </form>
        </section>
    </div>

    <div class="copyright text-white">
        <i class="bi bi-c-circle"></i>
        <span>HDMovies All Rights Reserved</span>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</body>

</html>