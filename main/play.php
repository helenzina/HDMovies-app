<?php
session_start();

if(empty($_SESSION['user_id'])){
  header("Location: login.php");
}
?>

<!doctype html>
<html lang="en">

<head>

  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">



  <link rel="icon" type="../images/logo.png" href="../images/logo.png" />
  <link rel="stylesheet" href="../css/landing.css">

  <title>HDMovies - Watch TV Shows Online, Watch Movies Online</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

</head>

<body style="min-height: 50rem;">

  <header>
    <!--nav-->
    <div class="nav container">
      <a href="landing_page.php" class="logo">
        <img src="../images/logotext red.png" alt="">
      </a>
      <div class="dropdown-box dropdown">
        <button class="dropdown dropdown-toggle" type="button" id="dropdownMenuButton1" onclick="showDropdown()"
          data-bs-toggle="dropdown" aria-expanded="false">
          <span class="dropdown-text">Browse</span>
        </button>
        <ul class="dropdown-menu" id="dropMenu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="landing_page.php#home" onclick="hideDropdown()">Home</a></li>
          <li><a class="dropdown-item" href="landing_page.php#popular" onclick="hideDropdown()">Popular</a></li>
          <li><a class="dropdown-item" href="movies.php" onclick="hideDropdown()">Movies</a></li>
          <li><a class="dropdown-item" href="series.php" onclick="hideDropdown()">Series</a></li>
          <li><a class="dropdown-item" href="favourite.php" onclick="hideDropdown()">Favourite</a></li>
        </ul>
      </div>
      <!--navbar-->
      <div class="navbar">

        <a href="landing_page.php#home" class="nav-link">
          <i class="bi bi-house"></i>
          <span class="nav-link-title">Home</span>
        </a>

        <a href="landing_page.php#popular" class="nav-link">
          <i class="bi bi-star"></i>
          <span class="nav-link-title">Popular</span>
        </a>

        <a href="movies.php" class="nav-link">
          <i class="bi bi-camera-reels"></i>
          <span class="nav-link-title">Movies</span>
        </a>

        <a href="series.php" class="nav-link">
          <i class="bi bi-tv"></i>
          <span class="nav-link-title">Series</span>
        </a>

        <a href="favourite.php" class="nav-link">
          <i class="bi bi-heart"></i>
          <span class="nav-link-title">Favourite</span>
        </a>

      </div>

      <!--user-->
      <img src="../images/profile.jpg" style="background-color: white" class="user-img" id="profileImage" onclick="showMenu()">
      <div class="sub-menu" id="subMenu">
        <div class="user-info">
          <?php if (isset($_SESSION["user_id"], $_SESSION["username"])): ?>
            <h4>
              <?= $_SESSION["username"] ?>
            </h4>
          <?php endif; ?>
        </div>
        <hr>
        <a href="profile.php" class="sub-menu-link">
          <span style="width: 100%;">
            <i class="bi bi-person-circle"></i>
            Profile
          </span>
          <span> > </span>
        </a>
        <a href="logout.php" class="sub-menu-link">
          <span style="width: 100%;">
            <i class="bi bi-box-arrow-right"></i>
            Logout
          </span>
          <span> > </span>
        </a>
      </div>

  </header>

  <div class="play-container container">
    <img src="///image///" alt="" class="play-img">
    <div class="play-text">
      <h2>///title///</h2>
      <span id="year">///year///</span>
      <div class="rating" id="vote_average">
        ///vote_average///
      </div>

      <div class="tags">
        <span>///genres///</span>
      </div>

    </div>

    <a href="#" class="play-btn" onclick="playVid()" type="button">
      <i class="bi bi-play-circle-fill card-icon play-movie" id="play"></i>
      <!--video-->
      <div class="video-container">
        <div class="video-box">
          <a href="#" class="play-btn"></a>
          <video id="myvideo" src="../videos/example.mp4" controls></video>
          <i class="bi bi-x close-video play-btn" onclick="pauseVid()" type="button"></i>
    </a>
  </div>

  </div>
  </a>
  </div>
  <!--overview-->
  <div class="overview container">
    <p>///overview///</p>
  </div>

  <!--cast-->
  <div class="cast container">

  </div>


  <!--copyright-->
  <div class="copy_land">
    <i class="bi bi-c-circle"></i>
    <span>HDMovies All Rights Reserved</span>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


  <script src="../js/main.js"></script>
  <script src="../js/popular.js"></script>
  <script src="../js/movies.js"></script>
  <script src="../js/series.js"></script>
  <script src="../js/play.js"></script>
</body>

</html>