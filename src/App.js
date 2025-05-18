import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Login from './pages/Login';

import Logoutmodal from './components/Logoutmodal';
import Headercommon1 from './components/Headercommon1';
import { UserContext } from './context/Usercontext';

import { auth } from './firebase';

function HeaderWrapper({ user, profile, setShowLogoutModal, onSearchChange }) {
  const location = useLocation();

  const noSearchPaths = ['/cart', '/contact', '/about', '/profile', '/login'];
  const showSearch = !noSearchPaths.includes(location.pathname);

  return (
    <Headercommon1
      user={user}
      profile={profile}
      onSearchChange={onSearchChange}
      setShowLogoutModal={setShowLogoutModal}
      showSearch={showSearch}
    />
  );
}

function AppInsideRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editable, setEditable] = useState(false);

  const { user, profile } = useContext(UserContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    auth.signOut()
      .then(() => {
        toast.success(`Logged out successfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    style: { fontSize: "1.2rem", padding: "16px" }
                });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        toast.error('Logout failed: ' + error.message);
      });
  };

  return (
    <>
      {location.pathname !== '/login' && (
        <HeaderWrapper
          user={user}
          profile={profile}
          onSearchChange={handleSearchChange}
          setShowLogoutModal={setShowLogoutModal}
        />
      )}

      <Logoutmodal
        show={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <div className="App">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/profile"
            element={
              <Profile
                editable={editable}
                setEditable={setEditable}
                setShowLogoutModal={setShowLogoutModal}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <AppInsideRouter />
    </Router>
  );
}

export default App;
