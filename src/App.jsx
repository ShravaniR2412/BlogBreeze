import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddBlog from './Pages/AddBlog';
import AboutUs from './Pages/About';
import Navbar from './components/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';


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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
