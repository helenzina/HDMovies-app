<?php
session_start();
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
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>


  <link rel="icon" type="../images/logo.png" href="../images/logo.png" />
  <link rel="stylesheet" href="../css/landing.css">

  <title>HDMovies - Watch TV Shows Online, Watch Movies Online</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

</head>

<body>

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
          <li><a class="dropdown-item" href="#home" onclick="hideDropdown()">Home</a></li>
          <li><a class="dropdown-item" href="#popular" onclick="hideDropdown()">Popular</a></li>
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
      <!--
      <img src="/////profile pic from db/////" class="user-img" id="profileImage">
        <ul id="dropdownMenu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a href="profile.php" class="dropdown-item"><i class="bi bi-person-circle"></i><span>Profile</span></a></li>
          <li><a href="logout.php" class="dropdown-item"><i class="bi bi-box-arrow-right"></i><span>Logout</span></a>
          </li>
        </ul>
      -->
      <img src="/////profile pic from db/////" class="user-img" id="profileImage" onclick="showMenu()">
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



    </div>
  </header>

  <!--home-->
  <div data-spy="scroll" data-target="navbar" data-offset="0">
    <section class="home container" id="home">
      <video class="home-video home" src="../some videos/the_killer.mp4" autoplay muted loop></video>

      <div class="home-text">
        <h1 class="home-title">The Killer</h1>
        <a class="btn watch-btn" href="#" role="button" onclick="toggleVideo()"> <i class="bi bi-play-fill"></i>
          <span class="text">Watch trailer</span>
        </a>
        <div class="video-container">
          <div class="video-box">
            <video id="myvideo" src="../some videos/the_killer.mp4" controls></video>
            <i class="bi bi-x close-video play-btn" onclick="closeTrailer()" type="button"></i>
          </div>
        </div>
      </div>
    </section>
    <!--popular-->
    <section class="popular container" id="popular">
      <div class="heading">
        <h2 class="heading-title">Popular Movies</h2>
      </div>

      <!--carousel-->
      <div id="carouselExampleIndicators1" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators1" data-bs-slide-to="4"
            aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="card">
              <div class="card-body">

              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="heading">
        <h2 class="heading-title">Popular Series</h2>
      </div>

      <!--carousel-->
      <div id="carouselExampleIndicators2" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide-to="4"
            aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="card">
              <div class="card-body">

              </div>
            </div>
          </div>

        </div>

    </section>


    <!--favourite-->
    <!--
    <section class="movies container" id="favourite" style="padding-top: 0rem;">

      <div class="heading">
        <h2 class="heading-title">Favourite</h2>
      </div>
      <div class="movies-content">
        <div class="movie-box">
          <img src="../images/logo.png" alt="" class="movie-box-img">
          <div class="box-text">
            <h2 class="movie-title">title</h2>
            <span class="movie-type">genre</span>
            <a href="#" class="play-btn">
              <i class="bi bi-play-circle-fill card-icon"></i>
            </a>
          </div>
        </div>
   

      </div>

    </section>

  </div>

  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="movies.php" tabindex="-1">Movies</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="series.php">Series</a>
      </li>
    </ul>
  </nav>
-->

    <!--copyright-->
    <div class="copy_land">
      <i class="bi bi-c-circle"></i>
      <span>HDMovies All Rights Reserved</span>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"></script>

    <script src="../js/main.js"></script>
    <script src="../js/popular.js"></script>
</body>

</html>