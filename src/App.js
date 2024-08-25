import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Products from './components/Products';


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
