import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footercommon from '../components/Footercommon';
import Headercommon2 from '../components/Headercommon2';
import { ToastContainer, toast } from 'react-toastify';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const confirmRemoveItem = (index) => {
        setItemToRemoveIndex(index);
    };

    const handleRemoveConfirmed = () => {
        const itemToRemove = cartItems[itemToRemoveIndex];
        const updatedCartItems = cartItems.filter((_, index) => index !== itemToRemoveIndex);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        toast.error(`${itemToRemove.title}, ${itemToRemove.model} Removed from cart!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            style: { fontSize: "1.2rem", padding: "16px" }
        });
        setItemToRemoveIndex(null); // Close modal
    };

    const handleCancelRemove = () => {
        setItemToRemoveIndex(null);
    };

    return (
        <div className="container-fluid">
            <div className="text-center text-white p-3 bg-black">
                <h1 style={{ fontFamily: 'ROBOT' }}>BALAJI SHOE MART</h1>
            </div>
            <br />
            <Headercommon2 />
            <div className="container mt-5">
                <h2 className="mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="pr-3">
                        Your cart is empty!!! <img src="/images/sad.png" className="img-fluid" style={{ width: "3cm", height: "3cm" }} alt="sad" />
                    </p>
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
                                                <button className="btn btn-danger" onClick={() => confirmRemoveItem(index)}>
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

            {itemToRemoveIndex !== null && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Remove Item</h5>
                                <button type="button" className="btn-close" onClick={handleCancelRemove}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to remove <strong>{cartItems[itemToRemoveIndex]?.title}, {cartItems[itemToRemoveIndex]?.model}</strong> from the cart?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={handleRemoveConfirmed}>Yes, Remove</button>
                                <button className="btn btn-secondary" onClick={handleCancelRemove}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
            <Footercommon />
        </div>
    );
}

export default Cart;
