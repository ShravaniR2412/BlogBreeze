import React from 'react';

function Navbar() {
  return (
    <nav className="bg-navy text-white p-4 flex justify-between items-center">
     <h1 className="text-4xl font-dancing-script">BlogBreeze</h1>

      <div className="space-x-6 text-lg">
        <a href="/" className="hover:text-lightblue">Home</a>
        <a href="/add" className="hover:text-lightblue">Add Blog</a>
        <a href="/about" className="hover:text-lightblue">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
