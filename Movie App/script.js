const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=180b778d0cdd0bdd01164c4698b4ed90&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=180b778d0cdd0bdd01164c4698b4ed90&query=';
const moviesGrid = document.getElementById('movies-grid');
const form = document.getElementById('form');
const search = document.getElementById('search-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    fetchThenUpdateMoviesGrid(SEARCH_URL + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});

function getMovieElement(movie) {
  const { title, url, rating, overview } = movie;

  const getRatingTag = () => {
    return rating >= 8.0 ? 'high' : rating >= 5.0 ? 'medium' : 'low';
  };

  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  movieElement.innerHTML = `<div class="movie__poster-cover">
  <img src="${url}" alt="${title}" class="movie__poster"/>
  </div>
  <div class="movie__info">
  <p class="movie__title">${title}</p>
  <p class="movie__rating" data-rating="${getRatingTag()}">${rating}</p>
  </div><p class="movie__overview">${overview}</p>`;

  return movieElement;
}

function MovieObject(movie) {
  const { title, poster_path, vote_average, overview } = movie;

  this.title = title;
  this.overview = overview;
  this.rating = vote_average;
  this.url = !poster_path ? null : IMG_PATH + poster_path;
}

MovieObject.prototype.isNoNullProperty = function () {
  return this.title && this.rating && this.overview && this.url;
};

function addMoviesToGrid(rawMoviesData) {
  moviesGrid.innerHTML = '';

  rawMoviesData.forEach((rawMovie) => {
    const movie = new MovieObject(rawMovie);
    if (movie.isNoNullProperty()) {
      moviesGrid.appendChild(getMovieElement(movie));
    }
  });
}

async function fetchMovies(moviesAPI) {
  try {
    const response = await fetch(moviesAPI);
    return await response.json();
  } catch (e) {
    return Promise.reject(new Error(e));
  }
}

function fetchThenUpdateMoviesGrid(moviesURL) {
  fetchMovies(moviesURL)
    .then((data) => {
      console.log(data);
      addMoviesToGrid(data.results);
    })
    .catch(console.error);
}

fetchThenUpdateMoviesGrid(API_URL);
