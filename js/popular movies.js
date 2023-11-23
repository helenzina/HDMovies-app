const API_KEY= "api_key=367252e60c24db0b754ac368cd58b460";
const BASE_URL= "https://api.themoviedb.org/3/"
const API_URL= BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL= "https://image.tmdb.org/t/p/w500/";
const GENRE_URL = BASE_URL + 'genre/movie/list?' + API_KEY;

// Call the function to get genre names before calling getMovies
getGenreNames();

function getGenreNames() {
  fetch(GENRE_URL)
    .then(res => res.json())
    .then(data => {
      // Store the genre names in a global variable for later use
      window.genreNames = {};
      data.genres.forEach(genre => {
        window.genreNames[genre.id] = genre.name;
      });

      // Now that you have the genre names, you can call getMovies
      getMovies(API_URL);
    });
}



function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
       showMovies(data.results);
    })
 }

 function showMovies(data) {
  // Assuming you have three carousels with IDs carouselExampleIndicators1, carouselExampleIndicators2, and carouselExampleIndicators3
  const carousels = document.querySelectorAll('.carousel');

  // Target only the first carousel (slider1)
  const firstCarousel = carousels[0];

  // Clear the current content of the first carousel
  firstCarousel.querySelector('.carousel-inner').innerHTML = '';

  // Define the number of cards to display per carousel item
  const cardsPerItem = 4;

  // Iterate through movies for the first carousel
  for (let i = 0; i < data.length; i += cardsPerItem) {
    // Create a new carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    // Create a section for each set of movies in the carousel item
    const movieSection = document.createElement('section');
    movieSection.classList.add('d-flex');

    // Iterate through movies in the current set
    for (let j = i; j < i + cardsPerItem && j < data.length; j++) {
      const movie = data[j];
      const { title, overview, poster_path, genre_ids, release_date, vote_average } = movie;

      const voteColor = getColor(vote_average);

      // Create a card for each movie
      const movieCard = document.createElement('div');
      movieCard.classList.add('card');

      // Populate the card with movie information
      movieCard.innerHTML = `
        <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <section class="d-flex justify-content-between">
            <div>
              <i class="bi bi-play-circle-fill card-icon"></i>
              <i class="bi bi-plus-circle card-icon"></i>
            </div>
            <div>
              <i class="bi bi-arrow-down-circle-fill card-icon"></i>
            </div>
          </section>
          <span class="d-flex justify-content-between">
            <p class="card-text m-0 text-white" style="font-weight: bold;">${title}</p>
            <p class="card-text m-0" style="color: ${voteColor}; font-size: 1rem" >${vote_average}</p>
          </span>
          <p class="m-0 card-text text-white" style="font-size: 0.8rem">${getGenreNamesString(genre_ids)}</p>
        </div>
      `;

      // Append the card to the movie section
      movieSection.appendChild(movieCard);
    }

    // Append the movie section to the carousel item
    carouselItem.appendChild(movieSection);

    // Append the carousel item to the first carousel
    firstCarousel.querySelector('.carousel-inner').appendChild(carouselItem);
  }
}


function getGenreNamesString(genreIds) {
  // Check if genreNames is available
  if (window.genreNames) {
    // Map genre ids to their corresponding names
    const genreNamesArray = genreIds.map(id => window.genreNames[id]);
    // Join the names with commas and return
    return genreNamesArray.join(', ');
  } else {
    // Return a placeholder or handle the case when genre names are not available
    return 'Genre information not available';
  }
}

 
function getColor(vote){
   if (vote>=8){
      return 'green';
   } else if (vote>=5){
      return 'orange';
   } else{
      return 'red';
   }
}
