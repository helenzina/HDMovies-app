document.addEventListener('DOMContentLoaded', function () {

    // Retrieve movieData from localStorage
    const movieDataJson = localStorage.getItem('movieData');
    

    if (movieDataJson) {
        // Convert the JSON string back to an object
        const movieData = JSON.parse(decodeURIComponent(movieDataJson));
        console.log(movieData);

        document.querySelector('.play-img').src = IMG_URL + movieData.poster_path;
        document.querySelector('.play-text h2').innerText = movieData.titleOrName;
        document.getElementById('vote_average').innerText = movieData.vote_average;
        document.querySelector('.tags span').innerText = movieData.genreNames;
        document.querySelector('.overview').innerText = movieData.overview;
        if (movieData.overview === "") {
          const overviewContainer = document.querySelector('.overview.container');
          if (overviewContainer) {
              overviewContainer.style.border = 'none';
          }
      }
      
        document.getElementById('year').innerText = movieData.movieYear;
        document.querySelector('.cast').innerText = movieData.cast;
        document.getElementById('vote_average').style.color= getColor(movieData.vote_average);

        const castContainer = document.querySelector('.cast');
        castContainer.innerHTML = ''; 

        movieData.cast.forEach(castMember => {
            const castButton = document.createElement('button');
            castButton.type = 'button';
            castButton.classList.add('btn', 'btn-dark', 'cast-btn');
            castButton.innerText = castMember;

            castContainer.appendChild(castButton);
        });

        // Clear movieData from localStorage (optional, if you don't need it anymore)
        localStorage.removeItem('movieData');
    } else {
        console.error('Movie data not found in localStorage.');
    }
});

function getColor(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }