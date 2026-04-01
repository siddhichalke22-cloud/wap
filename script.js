const API_KEY = "YOUR_API_KEY"; 
const BASE_URL = "https://www.omdbapi.com/";
async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) return;

  showLoading(true);

  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await res.json();

    if (data.Response === "False") {
      showEmptyState(true);
      renderMovies([]);
    } else {
      showEmptyState(false);
      renderMovies(data.Search);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  showLoading(false);
}
function showLoading(isLoading) {
  document.getElementById("loading").classList.toggle("hidden", !isLoading);
}
function showEmptyState(show) {
  document.getElementById("emptyState").classList.toggle("hidden", !show);
}
function renderMovies(movies) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="toggleWatchlist('${movie.imdbID}')">
        Add to Watchlist
      </button>
    `;

    container.appendChild(card);
  });
}
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
function toggleWatchlist(id) {
  if (watchlist.includes(id)) {
    watchlist = watchlist.filter(item => item !== id);
  } else {
    watchlist.push(id);
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
function pickRandomMovie() {
  if (watchlist.length === 0) {
    alert("No movies in watchlist!");
    return;
  }

  const randomId = watchlist[Math.floor(Math.random() * watchlist.length)];
  alert("Tonight's movie 🎬: " + randomId);
}