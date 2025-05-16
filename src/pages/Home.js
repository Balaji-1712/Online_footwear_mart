import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footercommon from '../components/Footercommon';
import Headercommon1 from '../components/Headercommon1';

function Home() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const cards = [
        { title: 'WALKAROO', model: 'BX1675', price: 250, mrp: 500, image: '/images/BX1675.jpg' , rating:5 },
        { title: 'VKC', model: 'BX1680', price: 300, mrp: 600, image: '/images/vkc_sandal_1.jpg' , rating:4 },
        { title: 'ADIDAS', model: 'BX1710', price: 350, mrp: 700, image: '/images/A_shoe_1.jpg',rating:5 },
        { title: 'PARAGON', model: 'BX1720', price: 350, mrp: 700, image: '/images/p_sandal_1.webp' , rating:5 },
    ];

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery)
    );

    const renderStars = (rating) => {
        return (
            <>
                {[...Array(5)].map((_, i) => (
                    <i 
                        key={i}
                        className={`bi bi-star${i < rating ? '-fill text-warning' : ''}`} 
                        style={{ fontSize: '1.7rem' }}
                    ></i>
                ))}
            </>
        );
    };

    const handleAddToCart = (item) => {
        setSelectedItem(item);
    };

    const handleConfirmation = (confirm) => {
        if (confirm) {
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            localStorage.setItem('cartItems', JSON.stringify([...existingCartItems, selectedItem]));
            alert(`${selectedItem.title}, ${selectedItem.model} added to cart successfully!`);
        }
        setSelectedItem(null);
    };

    return (
        <div className="container-fluid">
            <div className="text-center text-white p-3 bg-black">
                <h1 style={{ fontFamily: 'ROBOT' }}><i class="bi bi-shop"></i> BALAJI SHOE MART</h1>
            </div>
            <br />
            <div className="card text-center">
                <Headercommon1 onSearchChange={handleSearchChange} />
                <div className="card-body">
                    <div className="carousel slide mx-auto bg-warning border border-3 border-dark" style={{ width: '100%', height: '55vh' }} data-bs-ride="carousel" id="c1">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#c1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style={{ backgroundColor: 'black' }}></button>
                            <button type="button" data-bs-target="#c1" data-bs-slide-to="1" aria-label="Slide 2" style={{ backgroundColor: 'black' }}></button>
                            <button type="button" data-bs-target="#c1" data-bs-slide-to="2" aria-label="Slide 3" style={{ backgroundColor: 'black' }}></button>
                        </div>
                        <div className="carousel-inner" style={{ height: '100%' }}>
                            <div className="carousel-item active" style={{ height: '100%' }}>
                                <img src="/images/w_shoe_1.jpg" alt="slipper" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} />
                            </div>
                            <div className="carousel-item" style={{ height: '100%' }}>
                                <img src="/images/A_shoe_1.jpg" alt="slipper" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} />
                            </div>
                            <div className="carousel-item" style={{ height: '100%' }}>
                                <img src="/images/BX1675.jpg" alt="slipper" className="d-block w-100" style={{ objectFit: 'contain', height: '100%' }} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#c1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#c1" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="my-3 bg-success text-white p-2 fw-bold d-flex justify-content-between">
                <span className="text-start">TOP QUALITY BRANDS</span>
                <span className="text-end"><a href="/Products" className="text-white">FIND MORE IN PRODUCTS PAGE &gt;</a></span>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {filteredCards.map((card, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 border border-3 border-dark text-center">
                            <div className='text-center my-5'>
                                <img src={card.image} className="img-fluid" style={{width:"8cm",height:"8cm"}}  alt="" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title pb-4">{card.title}</h3>
                                <h5 className="card-subtitle pb-4">Model No: {card.model}</h5>
                                <div className="d-flex justify-content-center mb-3">
                                    {renderStars(card.rating)}
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <h4 className="text-center text-black pb-3 mb-0">&#8377;{card.price}</h4>
                                    <h6 className="ms-3">M.R.P: <s>&#8377;{card.mrp}</s></h6>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="button" className="btn btn-warning w-50"  onClick={() => handleAddToCart(card)}> <i className="bi bi-cart-plus"></i> Add to Cart</button>
                                    <button type="button" className="btn btn-warning w-50"><i className="bi bi-cart-check"></i> BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br />

            {selectedItem && (
                <div className="modal fade show" id="confirmationModal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} aria-labelledby="confirmationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="confirmationModalLabel">Confirm Addition</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedItem(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to add "<strong>{selectedItem.title}</strong>" , Model : "<strong>{selectedItem.model}</strong>" to the cart?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => handleConfirmation(true)}>Yes</button>
                                <button type="button" className="btn btn-secondary" onClick={() => handleConfirmation(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footercommon/>
        </div>
    );
}

export default Home;
