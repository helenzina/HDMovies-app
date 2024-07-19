const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + 'search/multi?' + API_KEY;

const moviesContent = document.getElementById('favoriteMoviesContainer');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
let totalPages;
let selectedPage = currentPage; // New variable to track the selected page

const moviesPerPage = 20;
let pagesToShow = 5;

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
      //renderPagination();
    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    selectedPage = 1;
    try {
      const searchResults = await searchMovies(query);
      showMedia(searchResults.results, 'movie');
      totalPages = Math.ceil(searchResults.total_results / moviesPerPage);
      //renderPagination();
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

async function fetchAndShowMedia(selectedType) {
  try {
    // Fetch favorite movies and TV series from the server
    const favoriteMovies = await fetchFavoriteMovies('movie');
    const favoriteSeries = await fetchFavoriteMovies('tv');
    const movies = await fetchMoviesByIds('movie', favoriteMovies);
    const series = await fetchMoviesByIds('tv', favoriteSeries);

    if (selectedType === '') {
      showMedia(movies, 'movie');
      showMedia(series, 'tv');
    } else if (selectedType === 'movie') {
      showMedia(movies, 'movie');
    } else {
      showMedia(series, 'tv');
    }

    //totalPages = Math.max(Math.ceil(movies.length / moviesPerPage), Math.ceil(series.length / moviesPerPage));
    renderPagination(totalPages);
  } catch (error) {
    console.error('Error fetching and showing media:', error.message);
  }
}

// Modify the event listener for DOMContentLoaded to call fetchAndShowMedia
document.addEventListener('DOMContentLoaded', async function () {
  try {
    populateType(TYPE_SELECT, { movie: 'Movies', tv: 'Series' });

    let selectedType = TYPE_SELECT.value;

    TYPE_SELECT.addEventListener('change', async function () {
      selectedType = TYPE_SELECT.value;
      currentPage = 1;
      selectedPage = 1;
      searchInput.value = '';

      // Fetch and show media based on the selected type
      await fetchAndShowType(selectedType);
      renderPagination(totalPages);
    });

    // Fetch and display the initial page of favorite movies and TV series
    await fetchAndShowMedia(selectedType);
    renderPagination(totalPages);
  } catch (error) {
    console.error('Error:', error.message);
  }
});


function renderPagination(totalPages) {
  paginationContainer.innerHTML = '';

  // Calculate the start and end pages to display
  let startPage = Math.max(1, selectedPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
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

      //const query = searchInput.value.trim();
      //const selectedGenre = GENRE_SELECT.value;
      //const selectedYear = YEAR_SELECT.value;
      const selectedType = TYPE_SELECT.value;


      //if (query === '') {
        if (selectedType === ''){
          await fetchAndShowType(selectedType);
        } else {
          await fetchAndShowMedia(selectedType);
        }
      //} else {
      //  const searchResults = await searchMovies(query);
      //  showMedia(searchResults.results, 'movie');
      //}

      renderPagination(totalPages);
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

//async function fetchMoviesWithPerPage(mediaType, page) {
//  const API_URL = BASE_URL + `discover/${mediaType}?${API_KEY}&page=${page}&per_page=${moviesPerPage}`;
//  const response = await fetch(API_URL);
//  return await response.json();
//}

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
    const response = await fetch('getFavourite.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mediaId,
        isFavorite,
        mediaType,
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
      console.log(`${mediaType} ${mediaId} marked as ${isFavorite ? 'favorite' : 'unfavorite'}`);

      const movieBox = document.getElementById(mediaId);

      if (!movieBox) {
        console.error(`Movie box with ID ${mediaId} not found`);
        return;
      }
  
      if (!isFavorite) {
        // If marking as unfavorite, hide the movie box
        movieBox.style.display = 'none';
      }

      // Update localStorage based on the favorite status
      let favoriteMedia = JSON.parse(localStorage.getItem(`favorite${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`)) || [];
      console.log(favoriteMedia);

      if (isFavorite) {
        favoriteMedia.push(mediaId);
      } else {
        favoriteMedia = favoriteMedia.filter(favMediaId => favMediaId !== mediaId);
      }

      localStorage.setItem(`favorite${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`, JSON.stringify(favoriteMedia));
    } else {
      console.error(`Failed to mark ${mediaType} as favorite`);
    }
  } catch (error) {
    console.error(`Error marking ${mediaType} as favorite:`, error.message);
  }
}

async function fetchFavoriteMovies(mediaType) {
  try {
    const response = await fetch('getFavourite.php');

    // Check if the response has JSON content type
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      // Parse JSON response
      const data = await response.json();

      if (mediaType === 'movie') {
        return data.favoriteMovies;
      } else if (mediaType === 'tv') {
        return data.favoriteSeries;
      }

    } else {
      // Handle non-JSON response
      const responseText = await response.text();
      const closingBracketPosition = responseText.indexOf('}');
      const trimmedResponse = responseText.substring(0, closingBracketPosition + 1);

      try {
        // Parse the trimmed JSON-like response
        const trimmedData = JSON.parse(trimmedResponse);
        if (mediaType === 'movie') {
          localStorage.setItem('favoriteMovies', JSON.stringify(trimmedData.favoriteMovies));
          return trimmedData.favoriteMovies;
        } else if (mediaType === 'tv') {
          localStorage.setItem('favoriteSeries', JSON.stringify(trimmedData.favoriteSeries));
          return trimmedData.favoriteSeries;
        }
      } catch (parseError) {
        console.error('Error parsing trimmed response:', parseError.message);
        // You might want to return an empty array or handle this case differently
        return [];
      }
    }
  } catch (error) {
    console.error('Error fetching favorite media:', error.message);
    throw new Error('Failed to fetch favorite media');
  }
}

async function fetchMoviesByIds(mediaType, movieIds) {
  try {

    const media = [];

    for (const mediaId of movieIds) {
      // Customize the API endpoint based on your API structure
      const API_URL = `${BASE_URL}${mediaType}/${mediaId}?${API_KEY}&language=en-US`;

      const response = await fetch(API_URL);
      const mediaData = await response.json();

      // Assuming mediaData contains the details of a single media
      media.push(mediaData);
    }

    return media;
  } catch (error) {
    console.error(`Error fetching ${mediaType}s by IDs:`, error.message);
    throw new Error(`Failed to fetch ${mediaType}s by IDs`);
  }
}


async function showMedia(data, mediaType) {
  moviesContent.innerHTML = '';

  if (data.length === 0) {
    // Display a message when there are no search results
    /*
    moviesContent.innerHTML = `
      <section class="movies container" id="movies"> 
        <br/>       
        <p class="nomovies">No movies found.</p>
        <div class="movies-content" id="moviesContent">
          <div class="movie-box"></div> 
        </div>
      </section>`;
    */
    // Adjust the height of the page
    document.body.style.minHeight = "50rem";
    document.querySelector('.copyright').style.padding = '0rem';
    document.querySelector('.movies.container').style.margin = '0 auto';
    document.getElementById('pagination').style.display='none';
    return;
  } else {
    document.body.style.minHeight = "70rem";
    //document.querySelector('.copyright').style.padding = '12rem';
  }

  // Fetch favorite movies and TV series from the server

  const favoriteMovies = await fetchFavoriteMovies('movie');
  const favoriteSeries = await fetchFavoriteMovies('tv');

  const favoriteMedia = [...favoriteMovies, ...favoriteSeries];
  
  const totalPagesMovies = Math.ceil(favoriteMovies.length / moviesPerPage);
  const totalPagesSeries = Math.ceil(favoriteSeries.length / moviesPerPage);
  if (TYPE_SELECT.value ===''){
    totalPages = Math.ceil(favoriteMedia.length / moviesPerPage);
  } else {
    totalPages = mediaType === 'movie' ? totalPagesMovies : totalPagesSeries;
  }

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedData = data.slice(startIndex, endIndex);


  paginatedData.forEach(media => {
    const { id, original_title, name, poster_path, genres, overview, vote_average, release_date, first_air_date } = media;
    const movieBox = document.createElement('div');
    movieBox.classList.add('movie-box');
    movieBox.id = id;

    const genreNames = getGenreNamesString(genres, mediaType);

    // Check if the movie is a favorite
    const isFavorite = favoriteMedia.includes(id);

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

    favBtn.dataset.mediaId = id;
    favBtn.dataset.isFavorite = isFavorite.toString();
    plusIcon.id = `plusIcon_${id}`;
    heartIcon.id = `heartIcon_${id}`;

    favBtn.addEventListener('click', async () => {
      const mediaId = favBtn.dataset.mediaId;
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
      markAsFavorite(mediaId, !isFavorite, mediaType);
    });

    const playBtn = movieBox.querySelector('.play-btn');
    playBtn.addEventListener('click', async () => {
      const mediaId = id;

      try {
        const castDetails = await fetchCastDetails(mediaType, mediaId);
        const castNames = castDetails.cast.slice(0, 5).map(member => member.name);
        const movieYear = release_date ? new Date(release_date).getFullYear() : first_air_date ? new Date(first_air_date).getFullYear() : '';
        const titleOrName = original_title || name;
        const voteAverage = parseFloat(vote_average).toFixed(1);

        const movieData = {
          titleOrName,
          poster_path,
          genreNames,
          overview,
          vote_average: voteAverage,
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

  //const totalPagesMovies = Math.ceil(favoriteMovies.length / moviesPerPage);
  //const totalPagesSeries = Math.ceil(favoriteSeries.length / moviesPerPage);
  //if (TYPE_SELECT.value ===''){
  //  totalPages = Math.ceil(favoriteMedia.length / moviesPerPage);
  //} else {
  //  totalPages = mediaType === 'movie' ? totalPagesMovies : totalPagesSeries;
  //}

  renderPagination(totalPages);
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
//TYPE_SELECT.addEventListener('change', handleTypeChange);

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
    if (selectedType === '') {
      // Fetch favorite movies and series from the server
      const favoriteMovies = await fetchFavoriteMovies('movie');
      const favoriteSeries = await fetchFavoriteMovies('tv');

      // Fetch details of favorite movies and series
      const movies = await fetchMoviesByIds('movie', favoriteMovies);
      const series = await fetchMoviesByIds('tv', favoriteSeries);

      showMedia(movies, 'movie');
      showMedia(series, 'tv');

      // Calculate total pages based on the longer of movies and series
      totalPages = Math.max(Math.ceil(movies.length / moviesPerPage), Math.ceil(series.length / moviesPerPage));
    } else {
      // Fetch and show details for the selected type
      const favoriteMedia = await fetchFavoriteMovies(selectedType);
      const media = await fetchMoviesByIds(selectedType, favoriteMedia);
      showMedia(media, selectedType);
      totalPages = Math.ceil(media.length / moviesPerPage);
    }

    // Render pagination links
    renderPagination(totalPages);
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
