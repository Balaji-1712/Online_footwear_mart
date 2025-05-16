import React from 'react';
import { NavLink } from 'react-router-dom';

const Headercommon = ({ onSearchChange }) => {
  const linkClass = ({ isActive }) => 'nav-link text-dark fw-bold' + (isActive ? ' active' : '');

  return (
    <div className="card-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-dark fw-bold">HOME</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink to="/Products" className={linkClass}>PRODUCTS</NavLink></li>
              <li className="nav-item"><NavLink to="/About" className={linkClass}>ABOUT</NavLink></li>
              <li className="nav-item"><NavLink to="/Contact" className={linkClass}>CONTACT</NavLink></li>
            </ul>
            <form className="d-flex me-3">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange} />
            </form>
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink to="/Profile" className={linkClass}><i className="bi bi-person-circle"></i> PROFILE</NavLink></li>
              <li className="nav-item ms-2"><NavLink to="/Cart" className={linkClass}><i className="bi bi-cart"></i> CART</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headercommon;
