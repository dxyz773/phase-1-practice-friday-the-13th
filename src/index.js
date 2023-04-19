//------------------------------------------------------------------------------//
//GLOBAL VARIABLES:
const resource = "http://localhost:3000/movies";
const nav = document.getElementById("movie-list");
const img = document.getElementById("detail-image");
const title = document.getElementById("title");
const yearReleased = document.getElementById("year-released");
const description = document.getElementById("description");
const watched = document.getElementById("watched");
const blood = document.getElementById("amount");
const bloodForm = document.getElementById("blood-form");
const bloodAmount = document.getElementById("blood-amount");
let currentMovie;

let movieArray;

//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
// FETCH REQUEST FUNCTIONS:
function getMovies() {
  return fetch(resource)
    .then((res) => res.json())
    .then((movies) => {
      movieArray = movies;
      currentMovie = movieArray[0];
      movies.map((movie) => renderNavImages(movie));
      renderCurrentMovie(currentMovie);
    });
}

//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
// RENDER FUNCTIONS:

function renderNavImages(movie) {
  const navImg = document.createElement("img");
  navImg.src = movie.image;
  navImg.alt = movie.title;
  nav.appendChild(navImg);
  navImg.addEventListener("click", () => {
    renderCurrentMovie(movie);
    currentMovie = movie;
  });
}

function renderCurrentMovie(movie) {
  img.src = movie.image;
  title.textContent = movie.title;
  yearReleased.textContent = movie.release_year;
  description.textContent = movie.description;
  bloodAmount.textContent = movie.blood_amount;
  watched.textContent = movie.watched ? "watched" : "unwatched";

  watched.addEventListener("click", () => {
    movie.watched = !movie.watched;
    watched.textContent = movie.watched ? "watched" : "unwatched";
  });
}

function getBloodAmount() {
  bloodAmount.addEventListener("change", (e) => {
    submitForm(e.target.value);
  });
}

function submitForm(bloodAmount) {
  bloodForm.addEventListener("submit", (e) => {
    e.preventDefault();

    currentMovie.blood_amount += Number(bloodAmount);
    blood.textContent = currentMovie.blood_amount;
    e.target["blood-amount"].value = "";
  });
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
// INVOCATION FOR FIRST FETCH REQUEST
getMovies();
getBloodAmount();
//------------------------------------------------------------------------------//
