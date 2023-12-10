<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mysqli = require __DIR__ . "/conn.php";

    $sql = sprintf("SELECT * FROM users WHERE email = '%s'", $mysqli->real_escape_string($_POST["email"]));

    $result = $mysqli->query($sql);
    $user = $result->fetch_assoc();

    if ($user) {
        if (password_verify($_POST["password"], $user["password_hash"])) {
            session_start();

            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["email"] = $user["email"];

            echo "User ID: " . $_SESSION["user_id"] . "<br>";
            echo "Username: " . $_SESSION["username"] . "<br>";
            echo "Email: " . $_SESSION["email"] . "<br>";

            // Check if "Remember Me" is checked
            if (isset($_POST['remember']) && $_POST['remember'] == 'on') {
                // Set a cookie with a long expiration time (e.g., 30 days)
                setcookie("user_email", $user["email"], time() + 30 * 24 * 3600, "/");
            }

            header("Location: landing_page.php");
            die();
        }
    }

    $is_invalid = true;
}

// Check for the presence of the "Remember Me" cookie
if (isset($_COOKIE['user_email'])) {
    // Auto-fill the email field if the cookie exists
    $remembered_email = htmlspecialchars($_COOKIE['user_email']);
} else {
    $remembered_email = "";
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
      <h2 class="text-white">Sign In</h2>
      <form class="mt-4" method="post">

        <div class="mb-3 bg-white rounded px-2">
          <label for="exampleInputEmail1" class="form-label small-text">Email Address</label>
          <input type="email" name="email" class="form-control border-0 p-0" id="exampleInputEmail1"
          aria-describedby="emailHelp" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">

        </div>

        <div class="mb-3 bg-white rounded px-2">
          <label for="exampleInputPassword1" class="form-label small-text">Password</label>
          <input type="password" name="password" class="form-control border-0 p-0" id="exampleInputPassword1">
        </div>

        <?php if ($is_invalid): ?>
          <p class="text-white invalid">Invalid email or password.</p>
        <?php endif; ?>

        <button type="submit" class="btn btn-danger mt-3">Sign In</button>

        <div class="mb-3 mt-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" name="remember">
          <label class="form-check-label text-white small-text" for="exampleCheck1">Remember Me</label>
        </div>
        <div class="mt-3">
          <p class="m-0 new">
            <span>New to HDMovies?</span>
            <a href="signup.php" class="signup">Sign up now.</a>
          </p>
        </div>
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