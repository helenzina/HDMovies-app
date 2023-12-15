<?php
session_start();

if (empty($_SESSION['user_id'])) {
    header("Location: login.php");
}

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
                echo json_encode(['success' => true, 'mediaId' => $mediaId, 'mediaType' => $mediaType]);
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
                echo json_encode(['success' => true, 'mediaId' => $mediaId, 'mediaType' => $mediaType]);
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