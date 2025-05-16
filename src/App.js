import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Products from './pages/Products';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/products" element={<Products/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
