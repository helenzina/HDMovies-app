<?php
$mysqli = require __DIR__ . "/conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST['email'];
    $token = bin2hex(random_bytes(16));
    $token_hash = hash("sha256", $token);
    $expiration = date("Y-m-d H:i:s", time() + 60 * 5);
    $sql = "UPDATE users SET reset_token_hash = ?, reset_token_expiration = ? WHERE email = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sss", $token_hash, $expiration, $email);
    $stmt->execute();

    if ($mysqli->affected_rows) {

        $mail = require __DIR__ . "/mailer.php";

        $mail->setFrom("support@hdmovies.com");
        $mail->addAddress($email);
        $mail->Subject = "Password Reset";
        $mail->Body = <<<END

    Click <a href="http://localhost/HDMovies-app/main/reset.php?token=$token">here</a> to reset your password. This link will be valid for 5 minutes.

    END;
        try {
            $mail->send();
        } catch (Exception $e) {
            echo "Email could not be sent. Mailer error: " . $mail->ErrorInfo;
        }
    }
    echo '<script>alert("Email sent, please check your inbox or junk folder.")</script>';
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
            <h2 class="text-white">Forgot password</h2>
            <form class="mt-4" method="post">
                <div class="d-flex justify-content-center align-items-center container">
                    <p class="text-white">We will send you an email to reset your password.</p>
                </div>
                <div class="mb-3 bg-white rounded px-2">
                    <label for="exampleInputEmail1" class="form-label small-text">Email Address</label>
                    <input type="email" name="email" class="form-control border-0 p-0" id="exampleInputEmail1"
                        aria-describedby="emailHelp" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">
                </div>

                <!--
                <?php if ($email_found): ?>
                    <p class="text-white invalid">Invalid email.</p>
                <?php endif; ?>
                -->

                <button type="submit" class="btn btn-danger mt-3">Email Me</button>

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