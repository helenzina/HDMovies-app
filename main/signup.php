<?php
session_start();
$mysqli = require __DIR__ . "/conn.php";

$username_already_exists = false;
$email_already_exists = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check if username already exists
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $username_already_exists = true;
    }

    // Check if email already exists
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $email_already_exists = true;
    }

    if ($username_already_exists === false && $email_already_exists === false) {
        // Process signup
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $_SESSION['signup_success'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        $_SESSION['password_hash'] = $password_hash;

        // Registration successful
        header("Location: subscription.php");
        die();
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

    <link rel="stylesheet" href="../css/signup.css">


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
            <h2 class="text-white">Sign Up</h2>
            <form class="mt-4" method="post">

                <div id="username-feedback" class="mb-3 bg-white rounded px-2">
                    <label for="username" class="form-label small-text">Username</label>
                    <input type="text" title="Username must be 5-20 characters long and contain letters and numbers."
                        pattern="^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,20}$" name="username" required
                        class="form-control border-0 p-0" id="username"
                        aria-describedby="usernameHelp" />
                </div>

                <div id="email-feedback" class="mb-3 bg-white rounded px-2">
                    <label for="email" class="form-label small-text">Email Address</label>
                    <input type="email" name="email" required onChange="onChangeEmail()"
                        class="form-control border-0 p-0" id="email" aria-describedby="emailHelp" />
                </div>

                <div class="mb-3 bg-white rounded px-2">
                    <label for="password" class="form-label small-text">Password</label>
                    <input type="password" title="Password must be at least 8 characters." pattern="[a-zA-Z0-9]{8,}"
                        name="password" required onChange="onChangePass()" class="form-control border-0 p-0"
                        id="password" aria-describedby="passwordHelp" />
                </div>

                <div class="mb-3 bg-white rounded px-2">
                    <label for="repeatpassword" class="form-label small-text">Repeat password</label>
                    <input type="password" name="repeatpassword" required onChange="onChangePass()"
                        class="form-control border-0 p-0" id="repeatpassword" aria-describedby="repeatPasswordHelp" />
                </div>

                <?php if ($username_already_exists && $email_already_exists): ?>
                    <p class="text-white invalid" style="font-weight: bold">User already exists, please login <a
                            href="login.php" class="signup"> here. </a></p>
                <?php elseif ($username_already_exists): ?>
                    <p class="text-white invalid" style="font-weight: bold">Username already exists.</p>
                <?php elseif ($email_already_exists): ?>
                    <p class="text-white invalid" style="font-weight: bold">Email already exists.</p>
                <?php endif; ?>

                <button type="submit" class="btn btn-danger mt-3">Sign Up</button>

            </form>
        </section>

    </div>

    <div class="copyright text-white">
        <i class="bi bi-c-circle"></i>
        <span>HDMovies All Rights Reserved</span>
    </div>

    <script src="../js/signup.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</body>

</html>