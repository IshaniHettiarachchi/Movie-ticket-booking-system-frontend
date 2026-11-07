
interface NavbarProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

function Navbar({ onSignInClick, onSignUpClick }: NavbarProps) {
  return (
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
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="#movies">Movies</a>
            <a className="nav-link" href="#theatres">Theatres</a>
            <a className="nav-link" href="#shows">Shows</a>

            <button
              type="button"
              className="btn btn-outline-light btn-sm px-3"
              onClick={onSignInClick}
            >
              Sign In
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm px-3"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
