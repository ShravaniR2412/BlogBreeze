import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/Home';
import AddBlog from './client/AddBlog';
import AboutUs from './client/components/About';
import Navbar from './client/components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        {/* Define the routes for Home and AddBlog components */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
