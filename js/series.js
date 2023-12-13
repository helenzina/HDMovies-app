const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/tv?' + API_KEY;
//const SEARCH_URL = BASE_URL + '/search/multi?' + API_KEY;

const moviesContent = document.getElementById('moviesContent');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let totalPages = 0;
let selectedPage = currentPage; // New variable to track the selected page


const moviesPerPage = 30;
const pagesToShow = 5;

const searchInput = document.getElementById('search-input');

const GENRE_SELECT = document.querySelector('.select-genre');
const YEAR_SELECT = document.querySelector('.select-year');

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
      const movies = await fetchMoviesWithPerPage('tv', currentPage);
      showMedia(movies.results, 'tv');
      totalPages = Math.ceil(movies.total_results / moviesPerPage);
      renderPagination();
    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    selectedPage = 1;
    try {
      const searchResults = await searchMovies(query);
      showMedia(searchResults.results, 'tv');
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
    const movieGenres = await fetchGenres('tv');

    // Populate genre dropdown
    populateSelect(GENRE_SELECT, movieGenres);

    populateYears(YEAR_SELECT);

    // Fetch and display the initial page of movies
    const movies = await fetchMoviesWithPerPage('tv', currentPage);
    showMedia(movies.results, 'tv');
    totalPages = movies.total_pages;

    // Fetch favorite movies
    const favoriteSeries = await fetchFavoriteMovies();

    // Update UI based on favorite movies
    updateFavoriteMoviesUI(favoriteSeries);

    // Render pagination links
    renderPagination();
  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Add this function to update UI based on favorite movies
function updateFavoriteMoviesUI(favoriteSeries) {
  const favBtns = document.querySelectorAll('.fav-btn');

  favBtns.forEach((favBtn) => {
    const serieId = favBtn.dataset.serieId;

    if (favoriteSeries.includes(serieId)) {
      // Movie is a favorite, display the heart icon
      const heartIcon = document.getElementById(`heartIcon_${serieId}`);
      if (heartIcon) {
        heartIcon.style.display = 'flex';
      }
    }
  });
}

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
        const movies = await fetchMoviesByGenreAndYear('tv', currentPage, selectedGenre, selectedYear);
        showMedia(movies.results, 'tv');
      } else {
        const searchResults = await searchMovies(query);
        showMedia(searchResults.results, 'tv');
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

async function markAsFavorite(mediaId, isFavorite, mediaType) {
  try {
    const response = await fetch('favourite.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mediaId,
        isFavorite,
        mediaType, // Include mediaType in the request
      }),
    });

    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
      throw new Error('Failed to parse JSON response');
    }

    if (data.success) {
      console.log(`Media ${mediaId} marked as ${isFavorite ? 'favorite' : 'unfavorite'}`);
      
      // Update localStorage based on the favorite status
      let favoriteMedia = JSON.parse(localStorage.getItem(`favorite${mediaType === 'movie' ? 'Movies' : 'Series'}`)) || [];

      if (isFavorite) {
        favoriteMedia.push(mediaId);
      } else {
        favoriteMedia = favoriteMedia.filter(favMediaId => favMediaId !== mediaId);
      }

      localStorage.setItem(`favorite${mediaType === 'movie' ? 'Movies' : 'Series'}`, JSON.stringify(favoriteMedia));
    } else {
      console.error(`Failed to mark ${mediaType} as favorite`);
    }
  } catch (error) {
    console.error(`Error marking ${mediaType} as favorite:`, error.message);
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
      console.log('Favorite series:', data.favoriteSeries);
      
      return data.favoriteSeries;
    } else {
      // Handle non-JSON response
      const responseText = await response.text();
      const closingBracketPosition = responseText.indexOf('}');
      const trimmedResponse = responseText.substring(0, closingBracketPosition + 1);

      try {
        // Parse the trimmed JSON-like response
        const trimmedData = JSON.parse(trimmedResponse);
        localStorage.setItem('favoriteSeries', JSON.stringify(trimmedData.favoriteSeries));
        return trimmedData.favoriteSeries;
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

  const favoriteSeries= await fetchFavoriteMovies();

  data.forEach(media => {
    const { id, title, name, poster_path, genre_ids, overview, vote_average, first_air_date } = media;

    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');

    const genreNames = getGenreNamesString(genre_ids, mediaType);

    // Check if the movie is a favorite
    const isFavorite = favoriteSeries.includes(id);

    movieBox.innerHTML = `
      <img src="${IMG_URL + poster_path}" class="movie-box-img">
      <div class="box-text">
        <h2 class="movie-title">${title || name}</h2>
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
    
        favBtn.dataset.serieId = id;
        favBtn.dataset.isFavorite = isFavorite.toString();
        plusIcon.id = `plusIcon_${id}`;
        heartIcon.id = `heartIcon_${id}`;
    
        favBtn.addEventListener('click', async () => {
          const serieId = favBtn.dataset.serieId;
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
          markAsFavorite(serieId, !isFavorite, mediaType);
    
          // Update the array of favorite movies
          updateFavoriteMovies(serieId, !isFavorite);
        });

        const playBtn = movieBox.querySelector('.play-btn');
        playBtn.addEventListener('click', async () => {
          // Assuming media has an 'id' property representing the movie ID
          const mediaId = id;
        
          try {
            // Fetch cast details before redirecting to the play page
            const castDetails = await fetchCastDetails('tv', mediaId);
            const castNames = castDetails.cast.slice(0, 5).map(member => member.name);
            const movieYear = first_air_date ? new Date(first_air_date).getFullYear() : '';
            const titleOrName= name;
        
            const movieData = {
              titleOrName,
              poster_path,
              genreNames,
              overview,
              vote_average,
              movieYear,
              cast: castNames, // Include cast information in movieData
            };
        
            const movieDataJson = JSON.stringify(movieData);
        
            // Store movieData in localStorage
            localStorage.setItem('movieData', movieDataJson);
        
            const movieTitle = encodeURIComponent(movieData.titleOrName);
        
            // Redirect to another page with only the title in the URL
            window.location.href = `play.php?title=${movieTitle}&year=${movieYear}`;
          } catch (error) {
            console.error('Error:', error.message);
          }
        });

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
    const movies = await fetchMoviesByGenreAndYear('tv', currentPage, genreId, year);

    showMedia(movies.results, 'tv');
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
    apiUrl += `&first_air_date_year=${year}`;
  }

  const response = await fetch(apiUrl);
  return await response.json();
}
