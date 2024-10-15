import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem('username'); // Check for username in local storage
  const handleAddBlogClick = () => {

    if (username) {
      navigate('/user/addblog'); // Navigate to Add Blog page if username exists
    } else {
      navigate('/login'); // Redirect to Login if username does not exist
    }
  };
  
  const handleProfileClick = () => {
    const username = localStorage.getItem('username'); // Check for username in local storage

    if (username) {
      navigate('/user/profile'); // Navigate to Add Blog page if username exists
    } else {
      navigate('/login'); // Redirect to Login if username does not exist
    }
  };

  return (
    <nav className="bg-navy text-white p-4 flex justify-between items-center">
      <h1 className="text-4xl font-dancing-script">BlogBreeze</h1>

      <div className="space-x-6 text-lg">
        <a href="/" className="hover:text-lightblue">Home</a>
        <button onClick={handleAddBlogClick} className="hover:text-lightblue">Add Blog</button>
        <a href="/about" className="hover:text-lightblue">About</a>
        {/* <a href="/Profile" className="hover:text-lightblue">Profile</a> */}
        {username ? (<button onClick={handleProfileClick} className="hover:text-lightblue">Profile</button>):(<button onClick={handleProfileClick} className="hover:text-lightblue">Login</button>)}
      </div>
    </nav>
  );
}

export default Navbar;
