
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-dark cinema-navbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <span className="brand-icon">▶</span> Cinema
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <a className="nav-link active" href="/">Home</a>
              <a className="nav-link" href="#movies">Movies</a>
              <a className="nav-link" href="#theatres">Theatres</a>
              <a className="nav-link" href="#shows">Shows</a>
              <a className="btn btn-outline-light btn-sm px-3" href="/signin">
                Sign In
              </a>
              <a className="btn btn-danger btn-sm px-3" href="/signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container hero-content">
          <p className="hero-label">YOUR BEST MOVIE EXPERIENCE</p>
          <h1>
            Movies are better
            <br />
            <span>on the big screen.</span>
          </h1>
          <p className="hero-description">
            Discover movies, explore showtimes, choose your seats
            and book your next cinema experience.
          </p>
          <a id="explore-movies-btn" href="#movies" className="btn btn-danger btn-lg px-4">
            Explore Movies
          </a>
        </div>
      </header>

      <main className="container py-5" id="movies">
        <div className="section-heading">
          <div>
            <p className="section-label">NOW SHOWING</p>
            <h2>Explore Movies</h2>
          </div>
          <span className="text-secondary">Find your next favourite</span>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="movie-card">
              <div className="movie-art movie-art-one">
                <span className="movie-art-title">THE<br />ADVENTURE</span>
                <span className="movie-tag">ACTION</span>
              </div>
              <div className="movie-info">
                <h5>Movie Title One</h5>
                <p>Action · Adventure</p>
                <button className="btn btn-danger w-100" onClick={() => alert('Movie details will be connected next.')}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="movie-card">
              <div className="movie-art movie-art-two">
                <span className="movie-art-title">BEYOND<br />THE STARS</span>
                <span className="movie-tag">SCI-FI</span>
              </div>
              <div className="movie-info">
                <h5>Movie Title Two</h5>
                <p>Sci-Fi · Drama</p>
                <button className="btn btn-danger w-100" onClick={() => alert('Movie details will be connected next.')}>
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="movie-card">
              <div className="movie-art movie-art-three">
                <span className="movie-art-title">A PERFECT<br />MOMENT</span>
                <span className="movie-tag">DRAMA</span>
              </div>
              <div className="movie-info">
                <h5>Movie Title Three</h5>
                <p>Drama · Family</p>
                <button className="btn btn-danger w-100" onClick={() => alert('Movie details will be connected next.')}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="future-section mt-5" id="theatres">
          <p className="section-label">YOUR CINEMA EXPERIENCE</p>
          <h2>Choose your cinema. Choose your seats.</h2>
          <p>
            Theatre information, available shows and live booking
            details will be loaded from our backend API.
          </p>
        </div>

        <div id="shows" className="py-4">
          <h2>Find Your Next Showtime</h2>
          <p className="text-secondary">
            Browse available movie shows and ticket prices.
          </p>
        </div>
      </main>

      <footer className="cinema-footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span className="fw-bold">▶ CineBook</span>
          <span>Movie Ticket Booking System · </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
