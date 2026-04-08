
const API_KEY = "9a9cfd56";
const BASE_URL = "https://www.omdbapi.com/";

// DOM
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const status = document.getElementById("status");
const yearFilter = document.getElementById("yearFilter");
const sortOption = document.getElementById("sortOption");
const toggle = document.getElementById("themeToggle");

// GLOBAL STATE
let allMovies = [];
let searchText = "";
let selectedYear = "";
let sortType = "";

// 🎬 FETCH MOVIES
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (!query) {
    status.innerText = "Please enter a movie name";
    return;
  }

  fetchMovies(query);
});

async function fetchMovies(query) {
  try {
    status.innerText = "Loading...";
    moviesContainer.innerHTML = "";

    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}`
    );

    const data = await response.json();
    console.log(data);

    if (data.Response === "True") {
      allMovies = data.Search;
      applyFilters(); // ✅ only this
      status.innerText = "";
    } else {
      status.innerText = data.Error;
    }
  } catch (error) {
    status.innerText = "Error fetching data ❌";
    console.error(error);
  }
}

// 🎯 MAIN FILTER PIPELINE
function applyFilters() {
  let result = [...allMovies];

  // 🔍 SEARCH
  result = result.filter(movie =>
    movie.Title.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🎛️ FILTER
  if (selectedYear !== "") {
    result = result.filter(movie => movie.Year === selectedYear);
  }

  // 🔄 SORT
  if (sortType === "az") {
    result.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  if (sortType === "year") {
    result.sort((a, b) => a.Year.localeCompare(b.Year));
  }

  displayMovies(result);
}

// 🎬 DISPLAY
function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Image"
      }" />

      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button onclick="addToWatchlist('${movie.imdbID}')">⭐</button>
      </div>
    `;

    moviesContainer.appendChild(movieCard);
  });
}

// 🔍 SEARCH INPUT
searchInput.addEventListener("input", () => {
  searchText = searchInput.value;
  applyFilters();
});

// 🎛️ FILTER
yearFilter.addEventListener("change", () => {
  selectedYear = yearFilter.value;
  applyFilters();
});

// 🔄 SORT
sortOption.addEventListener("change", () => {
  sortType = sortOption.value;
  applyFilters();
});

// ⭐ WATCHLIST
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function addToWatchlist(id) {
  const movie = allMovies.find(m => m.imdbID === id);

  if (!watchlist.some(m => m.imdbID === id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Added to watchlist ⭐");
  }
}

// 🌗 THEME TOGGLE
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});


