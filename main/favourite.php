<?php
session_start();
$mysqli = require __DIR__ . "/conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['mediaId'], $data['isFavorite'], $data['mediaType'])) {
        $mediaId = $data['mediaId'];
        $isFavorite = $data['isFavorite'];
        $mediaType = $data['mediaType'];

        $table = ($mediaType == 'movie') ? 'fav_movies' : 'fav_series';
        $mediaIdColumn = ($mediaType == 'movie') ? 'movie_id' : 'serie_id';

        if (!$isFavorite) {
            // If isFavorite is false, remove the media from the appropriate table
            $stmt = $mysqli->prepare("DELETE FROM $table WHERE user_id = ? AND $mediaIdColumn = ?");
            $stmt->bind_param('ii', $userId, $mediaId);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to update database']);
            }

            // Exit to prevent HTML from being sent
            exit;
        } else {
            // Perform database update to mark/unmark the media as favorite
            $stmt = $mysqli->prepare("INSERT INTO $table (user_id, $mediaIdColumn) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id = user_id");
            $stmt->bind_param('ii', $userId, $mediaId);

            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to update database']);
            }

            // Exit to prevent HTML from being sent
            exit;
        }
    }
}

$userId = $_SESSION['user_id'] ?? 0; // Assuming 0 for unauthenticated users

$movie_query = "SELECT movie_id FROM fav_movies WHERE user_id = ?";
$stmt = $mysqli->prepare($movie_query);
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$favoriteMovies = $result->fetch_all(MYSQLI_ASSOC);

$favoriteMoviesData = [];

foreach ($favoriteMovies as $favoriteItem) {
    $favoriteMoviesData[] = $favoriteItem['movie_id'];
}

$serie_query = "SELECT serie_id FROM fav_series WHERE user_id = ?";
$stmt = $mysqli->prepare($serie_query);
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$favoriteSeries = $result->fetch_all(MYSQLI_ASSOC);

$favoriteSeriesData = [];

foreach ($favoriteSeries as $favoriteItem) {
    $favoriteSeriesData[] = $favoriteItem['serie_id'];
}

// Combine the results into a single associative array
$outputData = [
    'favoriteMovies' => $favoriteMoviesData,
    'favoriteSeries' => $favoriteSeriesData,
];

// Encode and echo the combined results
echo json_encode($outputData);
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
    <link rel="stylesheet" href="../css/movies.css">

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
                    <li><a class="dropdown-item" href="landing_page.php#popular" onclick="hideDropdown()">Popular</a>
                    </li>
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

            <!--search-->
            <div class="search-box">
                <input type="search" name="" id="search-input" placeholder="Search...">
                <i class="bi bi-search"> </i>
            </div>
            <!--user-->

            <img src="../images/profile.jpg" style="background-color: white" class="user-img" id="profileImage"
                onclick="showMenu()">
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
        <section class="home container" id="favourite">

            <!--favourite-->
            <section class="movies container" id="favourite" style="padding-top: 0rem;">
                <div class="heading">
                    <h2 class="heading-title">Favourite</h2>
                    <select class="form-select form-select-sm select-type" aria-label="Small select example">
                        <option selected>Select type</option>

                    </select>
                </div>
                <div class="movies-content" id="favoriteMoviesContainer">

                </div>
            </section>

        </section>

    </div>

    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center" id="pagination">

        </ul>
    </nav>

    <!--copyright-->
    <div class="copyright">
        <i class="bi bi-c-circle"></i>
        <span>HDMovies All Rights Reserved</span>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    <script src="../js/main.js"></script>
    <script src="../js/favourite.js"></script>
    <script src="../js/popular.js"></script>
</body>

</html>