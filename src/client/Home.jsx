import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import BlogCard from './components/BlogCard';
import { FaSearch } from 'react-icons/fa';

const blogs = [
  {
    id: 1,
    image: 'https://wallpapers.com/images/hd/travel-hd-wruelfhuiyy7ewtw.jpg',
    title: 'Exploring the World',
    description: 'A brief description of this amazing travel blog.',
    category: 'Travel',
  },
  {
    id: 2,
    image: 'https://www.josephrosenfeld.com/wp-content/uploads/2016/06/Spring_2016_Fashion_Trends.jpg',
    title: 'Fashion Trends 2024',
    description: 'Latest trends in fashion that you need to know.',
    category: 'Fashion',
  },
  {
    id: 3,
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    title: 'Delicious Recipes',
    description: 'A quick overview of the most delicious dishes.',
    category: 'Cooking',
  },
  {
    id: 4,
    image: 'https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg',
    title: 'Tech Innovations',
    description: 'Discover the latest trends in technology.',
    category: 'Technology',
  },
  {
    id: 5,
    image: 'https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720',
    title: 'Health & Wellness',
    description: 'Tips to maintain a healthy lifestyle.',
    category: 'Health',
  },
  {
    id: 6,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWtu851bJ8w_56JZqSPkYQ5H4C1bSSzzv-g&s',
    title: 'DIY Projects',
    description: 'Creative and fun DIY projects for home.',
    category: 'DIY',
  },
  
];

function Home() {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const scrollRef = useRef(null); // Reference for scrolling

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter blogs based on search input
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Latest blogs (last 6 blogs)
  const latestBlogs = blogs.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 20; // Adjust the scroll amount
        // Reset to top when reaching the end
        if (scrollRef.current.scrollTop >= scrollRef.current.scrollHeight - scrollRef.current.clientHeight) {
          scrollRef.current.scrollTop = 0;
        }
      }
    }, 200); // Adjust the speed of scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-navy">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {/* Search Bar */}
        <div className="flex items-center bg-lightblue p-0.5 rounded-full mr-20 ml-20">
          <input
            type="text"
            placeholder="Search Blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 rounded-l-full bg-white text-navy focus:outline-none"
          />
          <button className="bg-navy text-white px-4 py-3 rounded-r-full hover:bg-lightblue flex items-center justify-center">
            <FaSearch />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="flex mt-8">
          {/* Main blog section */}
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <p>No blogs found.</p>
              )}
            </div>
          </div>

          {/* Sidebar for categories */}
          <div className="w-1/4 ml-4">
            <div className="bg-navy text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Travel</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Fashion</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Cooking</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Technology</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Health</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">DIY</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Lifestyle</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Finance</li>
                <li className="mb-2 hover:text-lightblue cursor-pointer">Education</li>
              </ul>
            </div>

            {/* Latest Blog Section with Scrolling Effect */}
            <div className="bg-white mt-8 p-4 rounded-lg shadow-lg border border-navy overflow-hidden">
              <h2 className="text-xl font-semibold mb-1 p-2 bg-navy text-white rounded-lg">Latest Blogs</h2>

              {/* Increase the height of the scrolling container */}
              <div className="h-64 overflow-hidden" ref={scrollRef}>
                <ul>
                  {latestBlogs.map((blog) => (
                    <li key={blog.id} className="flex items-center mb-4">
                      {/* Circular Image */}
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      {/* Blog Title */}
                      <div className="text-navy">
                        <p className="font-semibold">{blog.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
