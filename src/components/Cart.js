import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const handleRemoveItem = (indexToRemove) => {
        const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div className="container-fluid">
            <div className="text-center text-white p-3 bg-black">
                <h1 style={{ fontFamily: 'ROBOT' }}>BALAJI SHOE MART</h1>
            </div>
            <br />
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs bg-primary">
                        <li className="nav-item"><a className="nav-link text-dark fw-bold" aria-current="true" href="/">HOME</a></li>
                        <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/Products">PRODUCTS</a></li>
                        <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/About">ABOUT</a></li>
                        <li className="nav-item"><a className="nav-link text-dark fw-bold" href="/Contact">CONTACT</a></li>
                        <li className="nav-item ms-auto d-flex align-items-center">
                            <a className="nav-link text-dark fw-bold" href="/Profile"><i className="bi bi-person-circle"></i> PROFILE</a>
                            <a className="nav-link text-dark fw-bold ms-1 active" href="/Cart"><i className="bi bi-cart"></i> CART</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-5">
                <h2 className="mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="pr-3">Your cart is empty!!!    <img src="/images/sad.png" className="img-fluid" style={{width:"3cm",height:"3cm"}} alt="sad"></img></p>
                ) : (
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div className="col-12 mb-3" key={index}>
                                <div className="card h-100">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={item.image} alt={item.title} className="img-fluid rounded-start" />
                                        </div>
                                        <div className="col-md-8 d-flex align-items-center">
                                            <div className="card-body">
                                                <h4 className="card-title">{item.title}</h4>
                                                <p className="card-text">Model: {item.model}</p>
                                                <p className="card-text">Price: ₹{item.price}</p>
                                                <button className="btn btn-danger" onClick={() => handleRemoveItem(index)}>
                                                    <i className="bi bi-trash"></i> Remove
                                                </button>
                                                <button className="btn btn-success ms-2">
                                                    <i className="bi bi-cart-check"></i> Buy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <footer className="bg-dark text-white mt-5">
                <div className="container py-4">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>About Us</h5>
                            <p>We are a leading company in our industry, committed to providing quality products and exceptional service.</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-white">Home</a></li>
                                <li><a href="/About" className="text-white">About</a></li>
                                <li><a href="/Contact" className="text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Contact Us</h5>
                            <address>
                                Balaji Shoe Mart, Mettur, Salem - 636402, <br />
                                Tamil Nadu<br />
                                Email: <a href="mailto:balajikamaraj01@gmail.com" className="text-white">info@example.com</a>
                            </address>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="text-center">
                        <p className="mb-0">&copy; 2024 Balaji Shoe Mart. All rights reserved.</p>
                        <small>Comfort and Quality</small>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Cart;
