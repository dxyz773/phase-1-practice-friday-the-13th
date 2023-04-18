"use strict";

//3. BuildImg function invoked from getMovies function with movie objects from server response. Created image elements and set the src of each image element to the image from each movie object. Appends all images as a child of nav. Conditionally invoked handleCurrentMovie with the movie with id === 1.
function buildImg(movie) {
  const nav = document.getElementById("movie-list");
  const img = document.createElement("img");
  img.src = movie.image;
  nav.appendChild(img);
  if (movie.id === 1) {
    handleCurrentMovie(movie);
  }
  //Added click eventListener to each img. When clicked, invoke handleCurrentMovie function with movie that is clicked.
  img.addEventListener("click", (e) => handleCurrentMovie(movie));
}

//4. Helper function invoked from buildImg function first with the movie object with id === 1. Invoked fullMovieLayout with movie object with id === 1.

//Invoked each time img in nav is clicked. Passes in currently clicked movie object. Invoked fullMovieLayout with this current movie object
function handleCurrentMovie(movie) {
  // Not sure why this is working
  fullMovieLayout(movie);
}

//2. Fuction invoked to send GET request to server to recieve movie data. Used the for each method on the returned array of objects data and invoked buildImg function with each movie object.
function getMovies() {
  return fetch("http://localhost:3000/movies")
    .then((res) => res.json())
    .then((obj) => obj.forEach((movie) => buildImg(movie)));
}

// function updatWatchedButton(movie, obj) {
//   fetch(`http://localhost:3000/movies/${movie.id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(obj),
//   })
//     .then((res) => res.json)
//     .then((obj) => console.log(obj));
// }

//1. Invoke the getMovies function as soon as the page loads which sends the GET request to the server
getMovies();

//5. Function invoked from handleCurrentMovie function and passed at first the movie object with id === 1. Saved DOM elements for full Movie Layout in variables and set their text contents to the values from current movie object's details.

//Repeat function duties for every movie object that is passed in in response to image being clicked in nav and passed through my helper function. This function renders main movie layout.
function fullMovieLayout(movie) {
  const img = document.getElementById("detail-image");
  const title = document.getElementById("title");
  const releaseYear = document.getElementById("year-released");
  const description = document.getElementById("description");
  const form = document.getElementById("blood-form");
  // const btn = document.getElementById("watched");

  form.addEventListener("submit", (e) => handleBlood(e));

  img.src = movie.image;
  title.textContent = movie.title;
  releaseYear.textContent = movie.release_year;
  description.textContent = movie.description;

  function handleBlood(e) {
    e.preventDefault();
    const bloodDrops = parseInt(e.target.querySelector("#blood-amount").value);
    let bloodCounter = movie.blood_amount;
    console.log(e.target);
    addBlood(movie);
  }
}
function addBlood(movie) {
  fetch(`http://localhost:3000/movies/${movie.id}`);
}

// function handleBlood(e, movie) {
//   e.preventDefault();
//   const amount = document.getElementById("amount");
//   amount.textContent = movie.blood_amount;
//   let bloodButton = e.target.querySelector("#blood-amount").value;
//   let parse = parseInt(bloodButton);
//   let bloodAmount = 0;
//   bloodAmount += parse;
//   amount.textContent = bloodAmount;

//   console.log(amount);
//   // renderBlood(movie);
//   e.target.reset();
//   // handleBlood();
// }

// function renderBlood(movie, obj) {}

// btn.textContent = movie.watched ? "watched" : "unwatched";
// form.addEventListener("submit", (e) => handleBlood(e, movie));
