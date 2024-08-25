import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function Contact()
{
    return(
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
                        <li className="nav-item"><a className="nav-link text-dark fw-bold active" href="/Contact">CONTACT</a></li>
                        <li className="nav-item ms-auto d-flex align-items-center">
                            <a className="nav-link text-dark fw-bold" href="/Profile"><i className="bi bi-person-circle"></i>PROFILE</a>
                            <a className="nav-link text-dark fw-bold ms-2" href="/Cart"><i className="bi bi-cart"></i> CART</a>
                        </li>
                    </ul>
                </div>
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
                                TamilNadu<br />
                                Email:{' '}
                                <a href="mailto:balajikamaraj01@gmail.com" className="text-white">info@example.com</a>
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
export default Contact;