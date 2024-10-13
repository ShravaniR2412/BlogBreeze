import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './client/Home';
import AddBlog from './client/AddBlog';

function App() {
  return (
    <Router>
      <div>
        {/* Define the routes for Home and AddBlog components */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
