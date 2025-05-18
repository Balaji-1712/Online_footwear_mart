import { NavLink } from 'react-router-dom';

const Headercommon = ({
  onSearchChange,
  user,
  profile,
  setEditable,
  setShowLogoutModal,
  showSearch = true,
}) => {

  const linkClass = ({ isActive }) =>
    'nav-link text-dark fw-bold' + (isActive ? ' active' : '');

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex align-items-center text-white p-3 bg-black position-relative">
          <h1
            className="position-absolute start-50 translate-middle-x"
            style={{ fontFamily: 'ROBOT', margin: 0 }}
          >
            BALAJI SHOE MART
          </h1>

          {/* Right aligned login/logout */}
          <div className="ms-auto">
            {!user ? (
              <a
                href="/login"
                className="btn btn-outline-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login / Signup
              </a>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {profile?.name || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <br />

      <div className="card-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand text-dark fw-bold">
              HOME
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/products" className={linkClass}>
                    PRODUCTS
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className={linkClass}>
                    ABOUT
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className={linkClass}>
                    CONTACT
                  </NavLink>
                </li>
              </ul>

              {/* Conditionally render the search bar */}
              {showSearch && (
                <form className="d-flex me-3">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={onSearchChange}
                  />
                </form>
              )}

              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/profile" className={linkClass}>
                    <i className="bi bi-person-circle"></i> PROFILE
                  </NavLink>
                </li>
                <li className="nav-item ms-2">
                  <NavLink to="/cart" className={linkClass}>
                    <i className="bi bi-cart"></i> CART
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Headercommon;
