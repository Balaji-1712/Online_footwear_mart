import React from 'react';

function Headercommon2() {
  return (
    <div className="card-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-dark fw-bold active" href="/">HOME</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/products">PRODUCTS</a></li>
              <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/about">ABOUT</a></li>
              <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/contact">CONTACT</a></li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/profile"><i className="bi bi-person-circle"></i> PROFILE</a></li>
              <li className="nav-item ms-2"><a className="nav-link text-dark fw-bold" href="/cart"><i className="bi bi-cart"></i> CART</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headercommon2;
