import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function BlogCard({ blog }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-navy">{blog.title}</h2>
        <p className="text-gray-600">{blog.description}</p>
        <span className="text-lightblue font-semibold">{blog.category}</span>
        <div className="flex justify-end space-x-2 mt-4">
          <FaEdit className="text-blue-500 cursor-pointer" />
          <FaTrash className="text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
