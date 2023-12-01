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

  // Reset currentPage to 1 when search input is modified
  currentPage = 1;

  if (query === '') {
    selectedPage = 1;
    try {
      const movies = await fetchMoviesWithPerPage('movie', currentPage);
      showMedia(movies.results, 'movie');
      totalPages = Math.ceil(movies.total_results / moviesPerPage);
      renderPagination();
    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    selectedPage = 1;
    try {
      const searchResults = await searchMovies(query);
      showMedia(searchResults.results, 'movie');
      totalPages = Math.ceil(searchResults.total_results / moviesPerPage);
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
    totalPages = movies.total_pages;

    // Render pagination links
    renderPagination();
  } catch (error) {
    console.error('Error:', error.message);
  }
});


function renderPagination() {
  paginationContainer.innerHTML = '';

  // Calculate the start and end pages to display
  let startPage = Math.max(1, selectedPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }


  const noMoviesMessage = document.querySelector('.nomovies');
  if (noMoviesMessage) {
    paginationContainer.innerHTML = '';
    return;
  }

  // Add "Previous" button
  const prevButton = createPaginationButton('Previous', 'prev', currentPage === 1);
  paginationContainer.appendChild(prevButton);

  // Add page links
  for (let i = startPage; i <= totalPages; i++) {
    const pageItem = createPaginationButton(i, i, false);
    paginationContainer.appendChild(pageItem);
    if (i === endPage) {
      break;
    }
  }
  // Add "Next" button
  const nextButton = createPaginationButton('Next', 'next', currentPage === totalPages);
  paginationContainer.appendChild(nextButton);

  // Mark the selected page as active
  const activePage = paginationContainer.querySelector(`[data-page="${selectedPage}"]`);

  if (activePage) {
    activePage.classList.add('active');
  }
}


function createPaginationButton(label, value, isDisabled) {
  const pageItem = document.createElement('li');
  pageItem.classList.add('page-item');
  

  // Add "active" class to the selected page
  if (value === selectedPage) {
    pageItem.classList.add('active');
  }

  // Add "disabled" class to the "Previous" button when on the first page
  if (label === 'Previous' && currentPage === 1) {
    pageItem.classList.add('disabled');
  }

  if (label === 'Next' && isDisabled) {
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
      newPage = parseInt(direction);
    }

    if (newPage > 0 && newPage <= totalPages) {
      currentPage = newPage;
      selectedPage = newPage;

      const query = searchInput.value.trim();
      const selectedGenre = GENRE_SELECT.value;
      const selectedYear = YEAR_SELECT.value;

      if (query === '') {
        const movies = await fetchMoviesByGenreAndYear('movie', currentPage, selectedGenre, selectedYear);
        showMedia(movies.results, 'movie');
      } else {
        const searchResults = await searchMovies(query);
        showMedia(searchResults.results, 'movie');
      }

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

  if (data.length === 0) {
    // Display a message when there are no search results
    moviesContent.innerHTML = `
      <section class="movies container" id="movies"> 
      <br/>       
        <p class="nomovies">No movies found.</p>
          <div class="movies-content" id="moviesContent">
              
           <div class="movie-box">
  
           </div> 
          </div>
      </section>`;
  
    // Adjust the height of the page
    document.body.style.minHeight = "50rem";
    document.querySelector('.copyright').style.padding = '0rem';
  
    return;
  } else{
    document.body.style.minHeight = "100rem";
    document.querySelector('.copyright').style.padding = '12rem';
  }
  

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

  if (genreNames && Array.isArray(genreIds)) {
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

// Add these constants to your existing code
const GENRE_SELECT = document.querySelector('.select-genre');
const YEAR_SELECT = document.querySelector('.select-year');

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Fetch genre names for movies
    const movieGenres = await fetchGenres('movie');
    
    // Populate genre dropdown
    populateSelect(GENRE_SELECT, movieGenres);

    populateYears(YEAR_SELECT);

    // Fetch and display the initial page of movies
    const movies = await fetchMoviesWithPerPage('movie', currentPage);
    showMedia(movies.results, 'movie');
    totalPages = movies.total_pages;

    // Render pagination links
    renderPagination();
  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Add this function to fetch available years from the API
async function fetchAvailableYears() {
  try {
    // Manually set the range of years
    const minYear = 1950;
    const maxYear = 2023;

    // Create an array with the years in the specified range
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index);

    // Sort the years in descending order
    years.sort((a, b) => b - a);

    return years;
  } catch (error) {
    console.error('Failed to fetch years:', error);
    throw new Error('Failed to fetch years');
  }
}


async function populateYears(selectElement) {
  try {
    // Fetch available years from the API
    const years = await fetchAvailableYears();
    
    // Clear existing options
    selectElement.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select year';
    selectElement.appendChild(defaultOption);

    // Add year options
    years.forEach((year) => {
      const option = document.createElement('option');
      option.value = year;
      option.text = year;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching years:', error.message);
  }
}

// Add this function to populate the dropdown
function populateSelect(selectElement, options) {
  // Clear existing options
  selectElement.innerHTML = '';

  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Select genre';
  selectElement.appendChild(defaultOption);

  // Add genre options
  for (const genreId in options) {
    const option = document.createElement('option');
    option.value = genreId;
    option.text = options[genreId];
    selectElement.appendChild(option);
  }
}

// Add these event listeners to handle genre and year changes
GENRE_SELECT.addEventListener('change', handleGenreChange);
YEAR_SELECT.addEventListener('change', handleYearChange);

async function handleGenreChange() {
  currentPage= 1;
  selectedPage= 1;
  searchInput.value='';

  const selectedGenre = GENRE_SELECT.value;
  const selectedYear = YEAR_SELECT.value;

  await fetchAndShowMovies(selectedGenre, selectedYear);
}

async function handleYearChange() {
  currentPage= 1;
  selectedPage= 1;
  searchInput.value='';

  const selectedGenre = GENRE_SELECT.value;
  const selectedYear = YEAR_SELECT.value;

  await fetchAndShowMovies(selectedGenre, selectedYear);
}

async function fetchAndShowMovies(genreId, year) {
  try {
    const movies = await fetchMoviesByGenreAndYear('movie', currentPage, genreId, year);
    showMedia(movies.results, 'movie');
    totalPages = movies.total_pages;

    // Render pagination links
    renderPagination();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function fetchMoviesByGenreAndYear(mediaType, page, genreId, year) {
  let apiUrl = BASE_URL + `discover/${mediaType}?${API_KEY}&page=${page}&per_page=${moviesPerPage}`;

  if (genreId) {
    apiUrl += `&with_genres=${genreId}`;
  }

  if (year) {
    apiUrl += `&year=${year}`;
  }

  const response = await fetch(apiUrl);
  return await response.json();
}
