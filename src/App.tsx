import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shows from './pages/Shows';

import { useEffect, useState, type FormEvent } from 'react';
import { getAllMovies } from './services/movieService';
import type { Movie } from './services/movieService';
import { loginUser, registerUser } from './services/authService';

import { getAllTheatres } from './services/theatreService';
import type { Theatre } from './services/theatreService';
import SeatSelection from './pages/SeatSelection';


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [theatreLoading, setTheatreLoading] = useState(true);
  const [theatreError, setTheatreError] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null);



  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
        setError('');
      })
      .catch((err) => {
        console.error('Failed to load movies:', err);
        setError('Unable to load movies. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getAllTheatres()
      .then((data) => {
        setTheatres(data);
        setTheatreError('');
      })
      .catch((err) => {
        console.error('Failed to load theatres:', err);
        setTheatreError('Unable to load theatres. Please try again.');
      })
      .finally(() => {
        setTheatreLoading(false);
      });
  }, []);

  const nowShowingMovies = movies.filter(
    (movie) => movie.status === 'NOW_SHOWING'
  );

  const upcomingMovies = movies.filter(
    (movie) => movie.status === 'UPCOMING'
  );

  const otherMovies = movies.filter(
    (movie) => movie.status === 'ENDED'
  );

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthError('');
    setAuthLoading(true);

    try {
      const response =
        authMode === 'signin'
          ? await loginUser({ email, password })
          : await registerUser({ name, email, password });

      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name);
      localStorage.setItem('email', response.email);

      setAuthMode(null);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const apiError = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        setAuthError(
          apiError.response?.data?.message ||
          'Authentication failed. Please check your details.'
        );
      } else {
        setAuthError('Something went wrong. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const openAuthPopup = (mode: 'signin' | 'signup') => {
    setAuthError('');
    setName('');
    setEmail('');
    setPassword('');
    setAuthMode(mode);
  };

  const closeAuthPopup = () => {
    setAuthMode(null);
    setAuthError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const renderMovieCard = (movie: Movie) => (
    <div className="col-12 col-sm-6 col-lg-4" key={movie.id}>
      <div className="movie-card h-100">

        <div className="movie-poster">
          <img
            src={`/images/${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`}
            alt={`${movie.title} poster`}
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />

          <span className="movie-tag">{movie.genre}</span>
        </div>

        <div className="movie-info">
          <h5>{movie.title}</h5>

          <p>{movie.genre} · {movie.language}</p>

          <p>{movie.duration} minutes</p>


          <button
            className="btn btn-danger w-100"
            onClick={() => setSelectedMovie(movie)}
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );


  return (
    <div className="app">
      <Navbar
        onSignInClick={() => openAuthPopup('signin')}
        onSignUpClick={() => openAuthPopup('signup')}
      />


      {authMode && (
        <div
          className="movie-modal-overlay"
          onClick={closeAuthPopup}
        >
          <div
            className="movie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeAuthPopup}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-center">
              {authMode === 'signin' ? 'Welcome Back!' : 'Create Account'}
            </h2>

            <p className="text-center text-secondary">
              {authMode === 'signin'
                ? 'Sign in to continue your cinema experience.'
                : 'Join Cinema and enjoy your movie experience!'}
            </p>

            {authError && (
              <div className="alert alert-danger">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={25}
                  required
                />
                {authMode === 'signup' && (
                  <small className="text-secondary">
                    Password must contain 8 characters.
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100"
                disabled={authLoading}
              >
                {authLoading
                  ? 'Please wait...'
                  : authMode === 'signin'
                    ? 'Sign In'
                    : 'Create Account'}
              </button>
            </form>

            <p className="auth-switch">
              {authMode === 'signin'
                ? "Don't have an account? "
                : 'Already have an account? '}

              <button
                type="button"
                onClick={() =>
                  openAuthPopup(
                    authMode === 'signin' ? 'signup' : 'signin'
                  )
                }
              >
                {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div>

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
                    <p className="section-label">DISCOVER YOUR NEXT MOVIE</p>
                    <h2>Explore Our Movies</h2>
                  </div>
                  <span className="text-secondary">Find your next favourite</span>
                </div>


                {/* LOADING */}
                {loading && (
                  <div className="text-center py-5">
                    <p>Loading movies...</p>
                  </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                  <div className="text-center py-5">
                    <p className="text-danger">{error}</p>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* MOVIE SECTIONS */}
                {!loading && !error && (
                  <>
                    {/* NOW SHOWING */}
                    <div className="mt-4">
                      <p className="section-label">WATCH NOW</p>
                      <h2>Now Showing</h2>

                      <div className="row g-4 mt-2">
                        {nowShowingMovies.map(renderMovieCard)}
                      </div>
                    </div>

                    {/* UPCOMING */}
                    <div className="mt-5">
                      <p className="section-label">COMING SOON</p>
                      <h2>Upcoming Movies</h2>

                      <div className="row g-4 mt-2">
                        {upcomingMovies.map(renderMovieCard)}
                      </div>
                    </div>

                    {/* OTHER MOVIES */}
                    <div className="mt-5">
                      <p className="section-label">EXPLORE MORE</p>
                      <h2>Other Movies</h2>

                      <div className="row g-4 mt-2">
                        {otherMovies.map(renderMovieCard)}
                      </div>
                    </div>

                    {movies.length === 0 && (
                      <p className="text-center py-5">
                        No movies available yet.
                      </p>
                    )}
                  </>
                )}



                <section className="mt-5" id="theatres">
                  <div className="section-heading">
                    <div>
                      <p className="section-label">YOUR CINEMA EXPERIENCE</p>
                      <h2>Explore Our Theatres</h2>
                    </div>
                    <span className="text-secondary">
                      Find your favourite cinema
                    </span>
                  </div>

                  {theatreLoading && (
                    <div className="text-center py-5">
                      <p>Loading theatres...</p>
                    </div>
                  )}

                  {!theatreLoading && theatreError && (
                    <div className="text-center py-5">
                      <p className="text-danger">{theatreError}</p>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => window.location.reload()}
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {!theatreLoading && !theatreError && (
                    <div className="row g-4 mt-2">
                      {theatres
                        .filter((theatre) => theatre.status === 'ACTIVE')
                        .map((theatre) => (
                          <div
                            className="col-12 col-sm-6 col-lg-4"
                            key={theatre.id}
                          >
                            <div className="movie-card h-100">
                              <div className="movie-info">
                                <span className="badge bg-success mb-3">
                                  {theatre.status}
                                </span>

                                <h5>{theatre.name}</h5>

                                <p>
                                  <strong>Location:</strong> {theatre.location}
                                </p>

                                <p>
                                  <strong>Capacity:</strong> {theatre.capacity} seats
                                </p>
                                <button
                                  className="btn btn-danger w-100"
                                  onClick={() => setSelectedTheatre(theatre)}
                                >
                                  View Details
                                </button>

                              </div>
                            </div>

                          </div>
                        ))}

                      {theatres.
                        filter((theatre) => theatre.status === 'ACTIVE'
                        ).length === 0 && (
                          <div className="col-12 text-center py-4">
                            <p>No active theatres available yet.</p>
                          </div>
                        )}
                    </div>
                  )}
                </section>


              </main>

              {selectedMovie && (
                <div className="movie-modal-overlay">
                  <div className="movie-modal">

                    <button
                      className="modal-close"
                      onClick={() => setSelectedMovie(null)}
                    >
                      ×
                    </button>

                    <p className="section-label">MOVIE DETAILS</p>

                    <h2>{selectedMovie.title}</h2>

                    <p>{selectedMovie.description || 'No description available.'}</p>

                    <div className="movie-detail-list">
                      <p>
                        <strong>Genre:</strong> {selectedMovie.genre}
                      </p>

                      <p>
                        <strong>Language:</strong> {selectedMovie.language}
                      </p>

                      <p>
                        <strong>Duration:</strong> {selectedMovie.duration} minutes
                      </p>

                      <p>
                        <strong>Release Date:</strong> {selectedMovie.releaseDate}
                      </p>

                      <p>
                        <strong>Status:</strong> {selectedMovie.status}
                      </p>
                    </div>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() => setSelectedMovie(null)}
                    >
                      Close
                    </button>

                  </div>
                </div>
              )}
              {selectedTheatre && (
                <div
                  className="movie-modal-overlay"
                  onClick={() => setSelectedTheatre(null)}
                >
                  <div
                    className="movie-modal"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      className="modal-close"
                      onClick={() => setSelectedTheatre(null)}
                    >
                      ×
                    </button>

                    <p className="section-label">THEATRE DETAILS</p>

                    <h2>{selectedTheatre.name}</h2>

                    <div className="movie-detail-list">
                      <p>
                        <strong>Theatre ID:</strong> {selectedTheatre.id}
                      </p>

                      <p>
                        <strong>Location:</strong> {selectedTheatre.location}
                      </p>

                      <p>
                        <strong>Capacity:</strong> {selectedTheatre.capacity} seats
                      </p>

                      <p>
                        <strong>Status:</strong> {selectedTheatre.status}
                      </p>
                    </div>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() => setSelectedTheatre(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <footer className="cinema-footer">
                <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
                  <span className="fw-bold">▶ CineBook</span>
                  <span>Movie Ticket Booking System · </span>
                </div>
              </footer>
            </div>
          }
        />

        <Route path="/shows" element={<Shows />} />
        <Route path="/seats/:showId" element={<SeatSelection />} />
      </Routes>

    </div>
  );
}

export default App;