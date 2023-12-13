const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/multi?' + API_KEY;

const moviesContent = document.getElementById('favoriteMoviesContainer');
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

// Add these constants to your existing code
const GENRE_SELECT = document.querySelector('.select-genre');
const YEAR_SELECT = document.querySelector('.select-year');
const TYPE_SELECT = document.querySelector('.select-type');

document.addEventListener('DOMContentLoaded', async function () {
  try {

    // Fetch and display the initial page of movies
    //const movies = await fetchMoviesWithPerPage('movie', currentPage);
    //showMedia(movies.results, 'movie');
    populateType(TYPE_SELECT, { movie: 'Movie', tv: 'Series' });
    const favoriteMovies = await fetchFavoriteMovies();
    const movies = await fetchMoviesByIds(favoriteMovies);
    totalPages = movies.total_pages;
    showMedia(movies, 'movie');
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

async function fetchCastDetails(mediaType, mediaId) {
  try {
    const CAST_URL = `${BASE_URL}${mediaType}/${mediaId}/credits?${API_KEY}`;
    const response = await fetch(CAST_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cast details:', error.message);
    throw new Error('Error fetching cast details');
  }
}

async function markAsFavorite(movieId, isFavorite) {
  try {
    const response = await fetch('favourite.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mediaId: movieId,
        isFavorite,
        mediaType: 'movie', // Add mediaType to the request body
      }),
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle non-JSON response
      const responseText = await response.text();
      const closingBracketPosition = responseText.indexOf('}');
      const trimmedResponse = responseText.substring(0, closingBracketPosition + 1);

      try {
        data = JSON.parse(trimmedResponse);
      } catch (parseError) {
        console.error('Error parsing trimmed response:', parseError.message);
        throw new Error('Failed to parse JSON response');
      }
    }

    if (data.success) {
      console.log(`Movie ${movieId} marked as ${isFavorite ? 'favorite' : 'unfavorite'}`);
      
      // Update localStorage based on the favorite status
      let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

      if (isFavorite) {
        favoriteMovies.push(movieId);
      } else {
        favoriteMovies = favoriteMovies.filter(favMovieId => favMovieId !== movieId);
      }

      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    } else {
      console.error('Failed to mark movie as favorite');
    }
  } catch (error) {
    console.error('Error marking movie as favorite:', error.message);
  }
}


async function fetchMoviesByIds(movieIds) {
    try {
      const movies = [];
  
      for (const movieId of movieIds) {
        // Customize the API endpoint based on your API structure
        const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=367252e60c24db0b754ac368cd58b460&language=en-US`;
  
        const response = await fetch(API_URL);
        const movieData = await response.json();
  
        // Assuming movieData contains the details of a single movie
        movies.push(movieData);
      }
  
      return movies;
    } catch (error) {
      console.error('Error fetching movies by IDs:', error.message);
      throw new Error('Failed to fetch movies by IDs');
    }
  }
  

async function fetchFavoriteMovies() {
    try {
      const response = await fetch('favourite.php');
      
      // Check if the response has JSON content type
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // Parse JSON response
        const data = await response.json();
        console.log('Favorite movies:', data.favoriteMovies);
        
        return data.favoriteMovies;
      } else {
        // Handle non-JSON response
        const responseText = await response.text();
        const closingBracketPosition = responseText.indexOf('}');
        const trimmedResponse = responseText.substring(0, closingBracketPosition + 1);
  
        try {
          // Parse the trimmed JSON-like response
          const trimmedData = JSON.parse(trimmedResponse);
          localStorage.setItem('favoriteMovies', JSON.stringify(trimmedData.favoriteMovies));
          return trimmedData.favoriteMovies;
        } catch (parseError) {
          console.error('Error parsing trimmed response:', parseError.message);
          // You might want to return an empty array or handle this case differently
          return [];
        }
      }
    } catch (error) {
      console.error('Error fetching favorite movies:', error.message);
      throw new Error('Failed to fetch favorite movies');
    }
  }
  

  async function showMedia(data, mediaType) {  
    moviesContent.innerHTML = '';
  
    if (data.length === 0) {
      // Display a message when there are no search results
      moviesContent.innerHTML = `
        <section class="movies container" id="movies"> 
          <br/>       
          <p class="nomovies">No movies found.</p>
          <div class="movies-content" id="moviesContent">
            <div class="movie-box"></div> 
          </div>
        </section>`;
  
      // Adjust the height of the page
      document.body.style.minHeight = "50rem";
      document.querySelector('.copyright').style.padding = '0rem';
  
      return;
    } else {
      document.body.style.minHeight = "100rem";
      document.querySelector('.copyright').style.padding = '12rem';
    }
  
    // Fetch favorite movies from the server
    const favoriteMovies = await fetchFavoriteMovies();
  
    data.forEach(media => {
      const { id, original_title, name, poster_path, genres, overview, vote_average, release_date } = media;
      const movieBox = document.createElement('div');
      movieBox.classList.add('movie-box');
  
      const genreNames = getGenreNamesString(genres, mediaType);
  
      // Check if the movie is a favorite
      const isFavorite = favoriteMovies.includes(id);
  
      movieBox.innerHTML = `
        <img src="${IMG_URL + poster_path}" class="movie-box-img">
        <div class="box-text">
          <h2 class="movie-title">${original_title || name}</h2>
          <span class="movie-type">${genreNames}</span>
          <a href="#" class="play-btn">
            <i class="bi bi-play-circle-fill card-icon"></i>
          </a>
          <a href="#" class="fav-btn" data-movie-id="${id}" data-is-favorite="${isFavorite}">
            <i class="bi bi-plus-circle card-icon bi-plus-circle-movie" id="plusIcon_${id}"></i>
            <i class="bi bi-heart-fill card-icon bi-heart-fill-movie" id="heartIcon_${id}"></i>
          </a>
        </div>`;
  
      const favBtn = movieBox.querySelector('.fav-btn');
      const plusIcon = favBtn.querySelector('.bi-plus-circle');
      const heartIcon = favBtn.querySelector('.bi-heart-fill');
  
      if (isFavorite) {
        // If the movie is a favorite, display the heart icon
        plusIcon.style.display = 'none';
        heartIcon.style.display = 'flex';
      } else {
        // If the movie is not a favorite, display the plus icon
        plusIcon.style.display = 'flex';
        heartIcon.style.display = 'none';
      }
  
      favBtn.dataset.movieId = id;
      favBtn.dataset.isFavorite = isFavorite.toString();
      plusIcon.id = `plusIcon_${id}`;
      heartIcon.id = `heartIcon_${id}`;
  
      favBtn.addEventListener('click', async () => {
        const movieId = favBtn.dataset.movieId;
        const isFavorite = favBtn.dataset.isFavorite === 'true';
  
        if (!isFavorite) {
          // If the movie is not a favorite, mark it as favorite and display the heart icon
          plusIcon.style.display = 'none';
          heartIcon.style.display = 'flex';
        } else {
          // If the movie is already a favorite, unmark it and display the plus icon
          plusIcon.style.display = 'flex';
          heartIcon.style.display = 'none';
        }
  
        // Toggle the favorite status
        favBtn.dataset.isFavorite = (!isFavorite).toString();
  
        // Send a request to mark the movie as a favorite
        markAsFavorite(movieId, !isFavorite);
  
        // Update the array of favorite movies
        updateFavoriteMovies(movieId, !isFavorite);
      });
  
      const playBtn = movieBox.querySelector('.play-btn');
      playBtn.addEventListener('click', async () => {
        const mediaId = id;
  
        try {
          const castDetails = await fetchCastDetails('movie', mediaId);
          const castNames = castDetails.cast.slice(0, 5).map(member => member.name);
          const movieYear = release_date ? new Date(release_date).getFullYear() : '';
          const titleOrName = original_title;
  
          const movieData = {
            titleOrName,
            poster_path,
            genreNames,
            overview,
            vote_average,
            movieYear,
            cast: castNames,
          };
  
          const movieDataJson = JSON.stringify(movieData);
  
          localStorage.setItem('movieData', movieDataJson);
  
          const movieTitle = encodeURIComponent(movieData.titleOrName);
  
          window.location.href = `play.php?title=${movieTitle}&year=${movieYear}`;
        } catch (error) {
          console.error('Error:', error.message);
        }
      });
  
      moviesContent.appendChild(movieBox);
    });
  }
  

function getGenreNamesString(genreIds, mediaType) {

  if (Array.isArray(genreIds)) {
  const genreNamesArray = genreIds.map(genre => genre.name);
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

// Add this function to populate the dropdown
function populateType(selectElement, options) {
  // Clear existing options
  selectElement.innerHTML = '';
  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Select type';
  selectElement.appendChild(defaultOption);

  // Add media type options
  for (const type in options) {
    const option = document.createElement('option');
    option.value = type;
    option.text = options[type];
    selectElement.appendChild(option);
  }
}

// Add these event listeners to handle genre and year changes
GENRE_SELECT.addEventListener('change', handleGenreChange);
YEAR_SELECT.addEventListener('change', handleYearChange);
TYPE_SELECT.addEventListener('change', handleTypeChange);

async function handleGenreChange() {
  currentPage = 1;
  selectedPage = 1;
  searchInput.value = '';

  const selectedGenre = GENRE_SELECT.value;
  const selectedYear = YEAR_SELECT.value;

  await fetchAndShowMovies(selectedGenre, selectedYear);
}

async function handleYearChange() {
  currentPage = 1;
  selectedPage = 1;
  searchInput.value = '';

  const selectedGenre = GENRE_SELECT.value;
  const selectedYear = YEAR_SELECT.value;

  await fetchAndShowMovies(selectedGenre, selectedYear);
}

async function handleTypeChange() {
  currentPage = 1;
  selectedPage = 1;
  searchInput.value = '';

  const selectedType = TYPE_SELECT.value;

  await fetchAndShowType(selectedType);
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

async function fetchAndShowType(selectedType) {
  try {
    const favoriteMedia = await fetchFavoriteMedia(selectedType);
    const media = await fetchMediaByIds(selectedType, favoriteMedia);
    showMedia(media.results, selectedType);
    totalPages = media.total_pages;

    // Render pagination links
    renderPagination();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function fetchFavoriteMedia(selectedType) {
  try {
    const response = await fetch('favorite.php?type=' + selectedType);
    const data = await response.json();
    console.log('Favorite ' + selectedType + 's:', data.favoriteMedia);
    return data.favoriteMedia;
  } catch (error) {
    console.error('Error fetching favorite ' + selectedType + 's:', error.message);
    throw new Error('Failed to fetch favorite ' + selectedType + 's');
  }
}

async function fetchMediaByIds(selectedType, mediaIds) {
  try {
    const media = [];

    for (const mediaId of mediaIds) {
      // Customize the API endpoint based on your API structure
      const API_URL = BASE_URL + `${selectedType}/${mediaId}?${API_KEY}&language=en-US`;

      const response = await fetch(API_URL);
      const mediaData = await response.json();

      // Assuming mediaData contains the details of a single media
      media.push(mediaData);
    }

    return media;
  } catch (error) {
    console.error('Error fetching ' + selectedType + 's by IDs:', error.message);
    throw new Error('Failed to fetch ' + selectedType + 's by IDs');
  }
}


async function fetchMediaByType(mediaType, page) {
  let apiUrl = BASE_URL + `discover/${mediaType}?${API_KEY}&page=${page}&per_page=${moviesPerPage}`;

  const response = await fetch(apiUrl);
  return await response.json();
}

async function fetchMoviesByGenreAndYear(mediaType, page, genreId, year) {
  let apiUrl = BASE_URL + `discover/${mediaType}?${API_KEY}&page=${page}&per_page=${moviesPerPage}`;

  if (genreId) {
    apiUrl += `&with_genres=${genreId}`;
  }

  if (year) {
    apiUrl += `&primary_release_year=${year}`;
  }

  const response = await fetch(apiUrl);
  return await response.json();
}
