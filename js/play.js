function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// Retrieve the movieData from the query parameter
const movieDataJson = getQueryParam('movieData');
const movieData = JSON.parse(decodeURIComponent(movieDataJson));

// Update the content of elements with the received data
document.querySelector('play-img').src = movieData.poster_path;
document.querySelector('play-text').innerText = movieData.title;
document.getElementById('vote_average').innerText = `Vote Average: ${movieData.vote_average || 'N/A'}`;
document.querySelector('tags').innerText = `Genres: ${movieData.genreNames || 'N/A'}`;
document.querySelector('.overview').innerText = movieData.overview || 'No overview available';