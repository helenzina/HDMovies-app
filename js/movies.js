/*const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const moviesContent = document.getElementById('moviesContent');

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Fetch genre names for movies
    const movieGenres = await fetchGenres('movie');
    
    // Fetch movies and display them
    const movies = await fetchMovies('movie');
    showMedia(movies.results, 'movie');
  } catch (error) {
    console.error('Error:', error.message);
  }
});

async function fetchGenres(mediaType) {
  const GENRE_URL = BASE_URL + `genre/${mediaType}/list?${API_KEY}`;
  const response = await fetch(GENRE_URL);
  const data = await response.json();

  // Store the genre names in a global variable for later use
  window[`${mediaType}GenreNames`] = {};
  data.genres.forEach(genre => {
    window[`${mediaType}GenreNames`][genre.id] = genre.name;
  });

  return window[`${mediaType}GenreNames`];
}

async function fetchMovies(mediaType) {
  const API_URL = BASE_URL + `discover/${mediaType}?${API_KEY}`;
  const response = await fetch(API_URL);
  return await response.json();
}

function showMedia(data, mediaType) {
  // Clear the current content of the movies container
  moviesContent.innerHTML = '';

  // Iterate through media items and create movie boxes
  data.forEach(media => {
    const { title, name, poster_path, genre_ids } = media;

    // Create a movie box element
    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');

    // Populate the movie box with media information
    movieBox.innerHTML = `
      <img src="${IMG_URL + poster_path}" class="movie-box-img">
      <div class="box-text">
        <h2 class="movie-title" style="font-weight: bold;">${title || name}</h2>
        <span class="movie-type">${getGenreNamesString(genre_ids, mediaType)}</span>
        <a href="#" class="play-btn">
          <i class="bi bi-play-circle-fill card-icon"></i>
        </a>
      </div>
    `;

    // Append the movie box to the movies content container
    moviesContent.appendChild(movieBox);
  });
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


function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
*/
const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/multi?' + API_KEY;

const moviesContent = document.getElementById('moviesContent');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let totalPages = 0;
let selectedPage = currentPage; // New variable to track the selected page

const moviesPerPage = 30;
const pagesToShow = 5;

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', debounce(handleSearch, 500));

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

async function handleSearch() {
  const query = searchInput.value.trim();

  if (query === '') {
      // If the search input is empty, reset to the initial state
      currentPage = 1;
      selectedPage = 1;
      try {
          const movies = await fetchMoviesWithPerPage('movie', currentPage);
          showMedia(movies.results, 'movie');
          totalPages = movies.total_pages;
          renderPagination();
      } catch (error) {
          console.error('Error:', error.message);
      }
  } else {
      // If there is a search query, perform the search
      selectedPage = 1; // Reset to the first page when searching
      try {
          const searchResults = await searchMovies(query);
          showMedia(searchResults.results, 'movie');
          totalPages = searchResults.total_pages;
          renderPagination();
      } catch (error) {
          console.error('Error:', error.message);
      }
  }
}


async function searchMovies(query) {
    const searchUrl = `${SEARCH_URL}&query=${encodeURIComponent(query)}&page=${selectedPage}`;
    const response = await fetch(searchUrl);
    return await response.json();
}


document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch genre names for movies
        const movieGenres = await fetchGenres('movie');

        // Fetch and display the initial page of movies
        const movies = await fetchMoviesWithPerPage('movie', currentPage);
        showMedia(movies.results, 'movie');

        // Update total pages for pagination
        totalPages = movies.total_pages;

        // Render pagination links
        renderPagination();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// ...

function renderPagination() {
  paginationContainer.innerHTML = '';

  // Calculate the start and end pages to display
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  // Add "Previous" button
  const prevButton = createPaginationButton('Previous', 'prev', currentPage === 1);
  paginationContainer.appendChild(prevButton);

  // Add page links
  for (let i = startPage; i <= endPage; i++) {
      const pageItem = createPaginationButton(i, i, false);
      paginationContainer.appendChild(pageItem);
  }

  // Add "Next" button
  const nextButton = createPaginationButton('Next', 'next', currentPage === totalPages);
  paginationContainer.appendChild(nextButton);
}

function createPaginationButton(label, value, isDisabled) {
  const pageItem = document.createElement('li');
  pageItem.classList.add('page-item');

  // Add "active" class to the selected page
  if (value === selectedPage) {
      pageItem.classList.add('active');
  }

  // Add "disabled" class to the "Previous" button when on the first page
  if (label === 'Previous' && isDisabled) {
      pageItem.classList.add('disabled');
  }

  pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage('${value}')">${label}</a>`;
  return pageItem;
}

async function changePage(direction) {
    try {
        let newPage;

        if (direction === 'prev') {
            newPage = currentPage - 1;
        } else if (direction === 'next') {
            newPage = currentPage + 1;
        } else {
            newPage = parseInt(direction); // Parse the page number
        }

        if (newPage > 0 && newPage <= totalPages) {
            // Change the current page and selected page
            currentPage = newPage;
            selectedPage = newPage;

            // Fetch and display the selected page of movies
            const movies = await fetchMoviesWithPerPage('movie', currentPage);
            showMedia(movies.results, 'movie');

            // Update pagination
            renderPagination();
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}


async function fetchGenres(mediaType) {
    const GENRE_URL = BASE_URL + `genre/${mediaType}/list?${API_KEY}`;
    const response = await fetch(GENRE_URL);
    const data = await response.json();

    window[`${mediaType}GenreNames`] = {};
    data.genres.forEach(genre => {
        window[`${mediaType}GenreNames`][genre.id] = genre.name;
    });

    return window[`${mediaType}GenreNames`];
}

async function fetchMoviesWithPerPage(mediaType, page) {
    const API_URL = BASE_URL + `discover/${mediaType}?${API_KEY}&page=${page}&per_page=${moviesPerPage}`;
    const response = await fetch(API_URL);
    return await response.json();
}

function showMedia(data, mediaType) {
    moviesContent.innerHTML = '';

    data.forEach(media => {
        const { title, name, poster_path, genre_ids } = media;

        const movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');

        movieBox.innerHTML = `
            <img src="${IMG_URL + poster_path}" class="movie-box-img">
            <div class="box-text">
                <h2 class="movie-title">${title || name}</h2>
                <span class="movie-type">${getGenreNamesString(genre_ids, mediaType)}</span>
                <a href="#" class="play-btn">
                    <i class="bi bi-play-circle-fill card-icon"></i>
                </a>
            </div>
        `;

        moviesContent.appendChild(movieBox);
    });
}

function getGenreNamesString(genreIds, mediaType) {
    const genreNames = window[`${mediaType}GenreNames`];

    if (genreNames) {
        const genreNamesArray = genreIds.map(id => genreNames[id]);
        return genreNamesArray.join(', ');
    } else {
        return 'Genre information not available';
    }
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
