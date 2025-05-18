import { useState, useEffect } from 'react';
import Footercommon from '../components/Footercommon';
import { toast } from 'react-toastify';

function Products({ searchQuery }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    rating: null,
    minPrice: 0,
    maxPrice: 1000,
    brands: []
  });
  const [filteredCards, setFilteredCards] = useState([]);

  const cards = [
    { title: 'WALKAROO', model: 'BX1675', price: 250, mrp: 500, image: '/images/profile.png', rating: 2, category: 'men' },
    { title: 'VKC', model: 'BX1680', price: 300, mrp: 600, image: '/images/profile.png', rating: 4, category: 'men' },
    { title: 'ADIDAS', model: 'BX1710', price: 350, mrp: 700, image: '/images/profile.png', rating: 5, category: 'men' },
    { title: 'PARAGON', model: 'BX1720', price: 350, mrp: 700, image: '/images/profile.png', rating: 4, category: 'men' },
    { title: 'WALKAROO', model: 'BX1675', price: 250, mrp: 500, image: '/images/profile.png', rating: 2, category: 'women' },
    { title: 'VKC', model: 'BX1680', price: 300, mrp: 600, image: '/images/profile.png', rating: 4, category: 'women' },
    { title: 'ADIDAS', model: 'BX1710', price: 350, mrp: 700, image: '/images/profile.png', rating: 5, category: 'women' },
    { title: 'PARAGON', model: 'BX1720', price: 350, mrp: 700, image: '/images/profile.png', rating: 4, category: 'women' },
    { title: 'WALKAROO', model: 'BX1675', price: 250, mrp: 500, image: '/images/profile.png', rating: 2, category: 'children' },
    { title: 'VKC', model: 'BX1680', price: 300, mrp: 600, image: '/images/profile.png', rating: 4, category: 'children' },
    { title: 'ADIDAS', model: 'BX1710', price: 350, mrp: 700, image: '/images/profile.png', rating: 5, category: 'children' },
    { title: 'PARAGON', model: 'BX1720', price: 350, mrp: 700, image: '/images/profile.png', rating: 4, category: 'children' },
  ];

  useEffect(() => {
    setFilteredCards(cards);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'brands') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        brands: checked
          ? [...prevFilters.brands, value]
          : prevFilters.brands.filter((brand) => brand !== value)
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };

  const handleApplyFilters = () => {
    setFilteredCards(cards.filter(card => {
      const matchesRating = filters.rating ? card.rating >= Number(filters.rating) : true;
      const matchesPrice = card.price >= Number(filters.minPrice) && card.price <= Number(filters.maxPrice);
      const matchesBrand = filters.brands.length > 0 ? filters.brands.includes(card.title) : true;

      return matchesRating && matchesPrice && matchesBrand;
    }));
  };

  const handleClearFilters = () => {
    setFilters({ rating: null, minPrice: 0, maxPrice: 1000, brands: [] });
    setFilteredCards(cards);
  };

  const displayedCards = filteredCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery) || card.model.toLowerCase().includes(searchQuery)
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
      toast.success(`${selectedItem.title}, ${selectedItem.model} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { fontSize: "1.2rem", padding: "16px" }
      });
    }
    setTimeout(() => {
        setSelectedItem(null);
    }, 100);
  };

  const renderSection = (sectionTitle, cards) => (
    <>
      <h2 className="text-center mt-3 mb-4 bg-success text-white p-3" style={{ fontSize: '0.8cm' }}>{sectionTitle}</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="card h-100 border border-3 border-dark text-center">
              <div className='text-center my-5'>
                <img src={card.image} className="img-fluid" style={{ width: '7cm', height: '7cm' }} alt="" />
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
                  <button type="button" className="btn btn-warning w-50" onClick={() => handleAddToCart(card)}> <i className="bi bi-cart-plus"></i> Add to Cart</button>
                  <button type="button" className="btn btn-warning w-50"><i className="bi bi-cart-check"></i> BUY NOW</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-3">
            <div className="card-header text-center fw-bold fs-4 bg-primary text-white">Filters</div>
            <div className="card-body">
              <h5 className="card-title">By Rating</h5>
              {[1, 2, 3, 4, 5].map((star) => (
                <div className="form-check" key={star}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    value={star.toString()}
                    checked={filters.rating === star.toString()}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label">
                    {star} Star & Above
                  </label>
                </div>
              ))}

              <h5 className="card-title">By Price</h5>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    min="0"
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    min="0"
                  />
                </div>
              </div>

              <h5 className="card-title">By Brand</h5>
              {['WALKAROO', 'VKC', 'ADIDAS', 'PARAGON'].map((brand) => (
                <div className="form-check" key={brand}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="brands"
                    value={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label">
                    {brand}
                  </label>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-success w-100 mt-3"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
              <button
                type="button"
                className="btn btn-danger w-100 mt-3"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          {renderSection('Men', displayedCards.filter(card => card.category === 'men'))}
          {renderSection('Women', displayedCards.filter(card => card.category === 'women'))}
          {renderSection('Children', displayedCards.filter(card => card.category === 'children'))}
        </div>
      </div>

      {selectedItem && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add to Cart</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)}></button>
              </div>
              <div className="modal-body">
                <p>Do you want to add {selectedItem.title}, {selectedItem.model} to your cart?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => handleConfirmation(true)}>Yes</button>
                <button type="button" className="btn btn-secondary" onClick={() => handleConfirmation(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footercommon />
    </div>
  );
}

export default Products;
