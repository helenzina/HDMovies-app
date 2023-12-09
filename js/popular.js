const API_KEY = "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const SEARCH_URL = BASE_URL + '/search/multi?' + API_KEY;

// Assuming you have three carousels with IDs carouselExampleIndicators1, carouselExampleIndicators2, and carouselExampleIndicators3
const carousels = document.querySelectorAll('.carousel');
let globalMediaData1;
let globalMediaType1;
let globalMediaData2;
let globalMediaType2;

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
      if (mediaType === 'movie') {
        globalMediaData1 = data.results; // Store data globally for movie carousel
        globalMediaType1 = mediaType; // Store media type globally for movie carousel
        updateCards();
      } else if (mediaType === 'tv') {
        globalMediaData2 = data.results; // Store data globally for TV carousel
        globalMediaType2 = mediaType; // Store media type globally for TV carousel
        updateCards();
      }
    });
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

// Event listener for window resize to update the number of cards based on screen size
window.addEventListener('resize', updateCards);

function updateCards() {
  const currentMediaData1 = globalMediaData1;
  const currentMediaType1 = globalMediaType1;
  const currentMediaData2 = globalMediaData2;
  const currentMediaType2 = globalMediaType2;

  if (currentMediaData1 && currentMediaType1) {
    const maxCardsPerItem1 = calculateMaxCards();
    showMedia(currentMediaData1, currentMediaType1, maxCardsPerItem1, 0); // Pass 0 as the index for the first carousel
  }

  if (currentMediaData2 && currentMediaType2) {
    const maxCardsPerItem2 = calculateMaxCards();
    showMedia(currentMediaData2, currentMediaType2, maxCardsPerItem2, 1); // Pass 1 as the index for the second carousel
  }
}

function calculateMaxCards() {
  const windowWidth = window.innerWidth;
  let maxCardsPerItem = 4;

  if (windowWidth < 840) {
    maxCardsPerItem = windowWidth < 640 ? (windowWidth < 440 ? 1 : 2) : 3;
  }

  return maxCardsPerItem;
}



function showMedia(data, mediaType, maxCardsPerItem, carouselIndex) {
  const carousel = carousels[carouselIndex];
  const carouselInner = carousel.querySelector('.carousel-inner');
  const carouselIndicators = carousel.querySelector('.carousel-indicators');

  // Clear the current content of the carousel and indicators
  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';

  // Iterate through media items for the carousel
  for (let i = 0; i < data.length; i += maxCardsPerItem) {
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
    for (let j = i; j < i + maxCardsPerItem && j < data.length; j++) {
      const media = data[j];
      const { title, name, overview, poster_path, genre_ids, release_date, vote_average, first_air_date } = media;
      const genreNames = getGenreNamesString(genre_ids, mediaType);
      const voteColor = getColor(vote_average);

      // Create a card for each media item
      const mediaCard = document.createElement('div');
      mediaCard.classList.add('card');

      // Apply styles to the card for smaller size and centering
      if (maxCardsPerItem === 2 ) {
        mediaCard.style.maxWidth = '250px'; 
        mediaCard.style.margin = '0 1rem';
      }
      if (maxCardsPerItem === 1) {
        mediaCard.style.maxWidth = '250px';
        mediaCard.style.margin = 'auto';
      }
      if (maxCardsPerItem === 3 && j >= data.length - 2){
        mediaCard.style.maxWidth = '200px'; 
        mediaCard.style.margin = '0 auto';
      }

      // Populate the card with media information
      mediaCard.innerHTML = `
        <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title || name}">
        <div class="card-body">
          <section class="d-flex justify-content-between">
            <div>
              <a href="#" class="my-play-btn">
                <i class="bi bi-play-circle-fill card-icon"></i>
              </a>
            </div>
            <div>
        <a href="#" class="fav-btn" data-movie-id="${media.id}" data-is-favorite="false">
          <i class="bi bi-plus-circle card-icon bi-plus-circle-movie" id="plusIcon_${media.id}"></i>
          <i class="bi bi-heart-fill card-icon bi-heart-fill-movie" id="heartIcon_${media.id}"></i>
        </a>
            </div>
          </section>
          <span class="d-flex justify-content-between">
            <p class="card-text card-title m-0 text-white">${title || name}</p>
            <p class="card-text m-0" style="color: ${voteColor};">${vote_average}</p>
          </span>
          <p class="m-0 card-text card-genre text-white">${getGenreNamesString(genre_ids, mediaType)}</p>
        </div>
      `;

      const favBtn = mediaCard.querySelector('.fav-btn');
      const plusIcon = favBtn.querySelector('.bi-plus-circle');
      const heartIcon = favBtn.querySelector('.bi-heart-fill');
      heartIcon.style.display = 'none';
  
      favBtn.dataset.movieId = media.id;
      plusIcon.id = `plusIcon_${media.id}`;
      heartIcon.id = `heartIcon_${media.id}`;
  
      favBtn.addEventListener('click', async () => {
        const movieId = favBtn.dataset.movieId;
        const isFavorite = favBtn.dataset.isFavorite === 'true';
      
        const plusIcon = document.getElementById(`plusIcon_${movieId}`);
        const heartIcon = document.getElementById(`heartIcon_${movieId}`);
  
      
        if (!isFavorite) {
          plusIcon.style.display='none';
          heartIcon.style.display='flex';
        } else {
          plusIcon.style.display='flex';
          heartIcon.style.display='none';
        }
      
        // Toggle the favorite status
        favBtn.dataset.isFavorite = (!isFavorite).toString();
      
        // You can perform additional actions based on the favorite status here
      });

      const playBtn = mediaCard.querySelector('.my-play-btn');
      playBtn.addEventListener('click', async () => {
        // Assuming media has an 'id' property representing the movie ID
        const mediaId = media.id;

        try {
          // Fetch cast details before redirecting to the play page
          const castDetails = await fetchCastDetails(mediaType, mediaId);
          const castNames = castDetails.cast.slice(0, 5).map(member => member.name);

          const movieYear = (release_date ? new Date(release_date).getFullYear() : '')
            || (first_air_date ? new Date(first_air_date).getFullYear() : '');

          const titleOrName = title || name;

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

          // Store movieData in localStorage
          localStorage.setItem('movieData', movieDataJson);

          const movieTitle = encodeURIComponent(movieData.titleOrName);

          // Redirect to another page with only the title in the URL
          window.location.href = `play.php?title=${movieTitle}&year=${movieYear}`;
        } catch (error) {
          console.error('Error:', error.message);
        }
      });

      // Append the card to the media section
      mediaSection.appendChild(mediaCard);
    }

    // Append the media section to the carousel item
    carouselItem.appendChild(mediaSection);

    // Append the carousel item to the carousel
    carouselInner.appendChild(carouselItem);

    // Create a new carousel indicator
    const indicator = document.createElement('button');
    indicator.setAttribute('type', 'button');
    indicator.setAttribute('data-bs-target', `#carouselExampleIndicators${carouselIndex + 1}`);
    indicator.setAttribute('data-bs-slide-to', i / maxCardsPerItem);
    if (i === 0) {
      indicator.classList.add('active');
    }

    // Append the indicator to the carousel indicators
    carouselIndicators.appendChild(indicator);
  }

  // Initialize the carousel after updating content
  new bootstrap.Carousel(carousel);
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
