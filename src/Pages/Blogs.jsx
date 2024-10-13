import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore imports
import BlogCard from '../components/BlogCard'; // Assuming BlogCard is in the same folder

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store selected category

  // Fetch blogs for the logged-in user
  useEffect(() => {
    const fetchBlogs = async () => {
      const db = getFirestore(); // Initialize Firestore
      const username = localStorage.getItem('username'); // Get username from local storage

      if (!username) {
        alert('User not logged in');
        return;
      }

      try {
        // Query Firestore for blogs where the username matches
        const q = query(collection(db, 'blogs'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        const userBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        setBlogs(userBlogs); // Set the fetched blogs in state
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle blog deletion
  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Do you want to delete this blog?");
    if (confirmDelete) {
      const db = getFirestore(); // Initialize Firestore
      try {
        await deleteDoc(doc(db, 'blogs', blogId)); // Delete the blog document
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId)); // Remove blog from state
        console.log(`Blog with ID ${blogId} deleted successfully`);
      } catch (error) {
        console.error("Error deleting blog: ", error);
      }
    }
  };

  // Filtered blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center text-navy mb-8">My Blogs</h1>
      
      {/* Category Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-medium mb-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Fashion">Fashion</option>
          <option value="Cooking">Cooking</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="DIY">DIY</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Show message if no blogs are found */}
      {filteredBlogs.length === 0 && selectedCategory ? (
        <p>No blogs found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} /> // Pass the blog data and delete function to BlogCard component
          ))}
        </div>
      )}
    </div>
  );
}
