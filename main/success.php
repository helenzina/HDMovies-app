<?php
session_start();
require __DIR__ . "/conn.php";

$username = $_SESSION['username'];
$email = $_SESSION['email'];
$password_hash = $_SESSION['password_hash'];
$subscriptionStartDate = $_SESSION["subscription_start_date"];
$subscriptionEndDate = $_SESSION["subscription_end_date"] ;
$selectedPlan= $_SESSION["selected_plan"];

//prepei sto success.php
$sql = "INSERT INTO users (username, email, password_hash, subscription_start_date, subscription_end_date, selected_plan) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql);

if (!$stmt) {
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("ssssss", $username, $email, $password_hash, $subscriptionStartDate, $subscriptionEndDate, $selectedPlan);

$stmt->execute();
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
  <link rel="stylesheet" href="../css/successful_signup.css">

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
      <p class="text-white">Signup successful. You can sign in
        <a href="login.php" class="signin">here.</a>
      </p>
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