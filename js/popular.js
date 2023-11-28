const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/multi?' + API_KEY;


const searchbox = document.getElementById('search-box');
const search = document.getElementById('search-input');

// Assuming you have three carousels with IDs carouselExampleIndicators1, carouselExampleIndicators2, and carouselExampleIndicators3
const carousels = document.querySelectorAll('.carousel');

// Call the function to get genre names before calling getMedia
getGenreNames();

function getGenreNames() {
  fetchGenres('movie');
  fetchGenres('tv');
}

function fetchGenres(mediaType) {
  const GENRE_URL = BASE_URL + `genre/${mediaType}/list?${API_KEY}`;

  fetch(GENRE_URL)
    .then(res => res.json())
    .then(data => {
      // Store the genre names in a global variable for later use
      window[`${mediaType}GenreNames`] = {};
      data.genres.forEach(genre => {
        window[`${mediaType}GenreNames`][genre.id] = genre.name;
      });

      // Now that you have the genre names, you can call getMedia
      getMedia(mediaType);
    });
}

function getMedia(mediaType) {
  const API_URL = BASE_URL + `/discover/${mediaType}?sort_by=popularity.desc&${API_KEY}`;

  fetchMovies(API_URL, mediaType);
}

function fetchMovies(url, mediaType) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showMedia(data.results, mediaType);
    });
}

function showMedia(data, mediaType) {
  const carousel = carousels[mediaType === 'movie' ? 0 : 1];

  // Clear the current content of the carousel
  carousel.querySelector('.carousel-inner').innerHTML = '';

  // Define the number of cards to display per carousel item
  const cardsPerItem = 4;

  // Iterate through media items for the carousel
  for (let i = 0; i < data.length; i += cardsPerItem) {
    // Create a new carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    // Create a section for each set of media items in the carousel item
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('d-flex');

    // Iterate through media items in the current set
    for (let j = i; j < i + cardsPerItem && j < data.length; j++) {
      const media = data[j];
      const { title, name, overview, poster_path, genre_ids, release_date, vote_average } = media;

      const voteColor = getColor(vote_average);

      // Create a card for each media item
      const mediaCard = document.createElement('div');
      mediaCard.classList.add('card');

      // Populate the card with media information
      mediaCard.innerHTML = `
        <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title || name}">
        <div class="card-body">
          <section class="d-flex justify-content-between">
            <div>
              <i class="bi bi-play-circle-fill card-icon"></i>
            </div>
            <div>
              <i class="bi bi-plus-circle card-icon"></i>
            </div>
          </section>
          <span class="d-flex justify-content-between">
            <p class="card-text m-0 text-white" style="font-weight: bold;">${title || name}</p>
            <p class="card-text m-0" style="color: ${voteColor}; font-size: 1rem">${vote_average}</p>
          </span>
          <p class="m-0 card-text text-white" style="font-size: 0.8rem">${getGenreNamesString(genre_ids, mediaType)}</p>
        </div>
      `;

      // Append the card to the media section
      mediaSection.appendChild(mediaCard);
    }

    // Append the media section to the carousel item
    carouselItem.appendChild(mediaSection);

    // Append the carousel item to the carousel
    carousel.querySelector('.carousel-inner').appendChild(carouselItem);
  }
}

function getGenreNamesString(genreIds, mediaType) {
  const genreNames = window[`${mediaType}GenreNames`];

  // Check if genreNames is available
  if (genreNames) {
    // Map genre ids to their corresponding names
    const genreNamesArray = genreIds.map(id => genreNames[id]);
    // Join the names with commas and return
    return genreNamesArray.join(', ');
  } else {
    // Return a placeholder or handle the case when genre names are not available
    return 'Genre information not available';
  }
}

searchbox.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMediaSearchResults(searchTerm);
  } else {
    getMedia('movie');
  }
});

function getMediaSearchResults(searchTerm) {
  const SEARCH_URL = BASE_URL + `/search/multi?${API_KEY}&query=${searchTerm}`;

  fetchMovies(SEARCH_URL, 'search');
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

