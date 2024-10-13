import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing icons

const blogs = [
  {
    id: 1,
    image: "https://wallpapers.com/images/hd/travel-hd-wruelfhuiyy7ewtw.jpg",
    title: "Exploring the World",
    description: "A brief description of this amazing travel blog.",
    category: "Travel",
  },
  {
    id: 2,
    image:
      "https://www.josephrosenfeld.com/wp-content/uploads/2016/06/Spring_2016_Fashion_Trends.jpg",
    title: "Fashion Trends 2024",
    description: "Latest trends in fashion that you need to know.",
    category: "Fashion",
  },
  {
    id: 3,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
    title: "Delicious Recipes",
    description: "A quick overview of the most delicious dishes.",
    category: "Cooking",
  },
  {
    id: 4,
    image:
      "https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg",
    title: "Tech Innovations",
    description: "Discover the latest trends in technology.",
    category: "Technology",
  },
  {
    id: 5,
    image:
      "https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720",
    title: "Health & Wellness",
    description: "Tips to maintain a healthy lifestyle.",
    category: "Health",
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWtu851bJ8w_56JZqSPkYQ5H4C1bSSzzv-g&s",
    title: "DIY Projects",
    description: "Creative and fun DIY projects for home.",
    category: "DIY",
  },
  {
    id: 7,
    image:
      "https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720",
    title: "Fitness Routines",
    description: "Best exercises to keep yourself in shape.",
    category: "Fitness",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
    title: "Photography Tips",
    description: "Improve your photography skills.",
    category: "Photography",
  },

  {
    id: 9,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
    title: "Delicious Recipes",
    description: "A quick overview of the most delicious dishes.",
    category: "Cooking",
  },
  {
    id: 10,
    image:
      "https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg",
    title: "Tech Innovations",
    description: "Discover the latest trends in technology.",
    category: "Technology",
  },
  {
    id: 11,
    image:
      "https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720",
    title: "Health & Wellness",
    description: "Tips to maintain a healthy lifestyle.",
    category: "Health",
  },
  {
    id: 12,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWtu851bJ8w_56JZqSPkYQ5H4C1bSSzzv-g&s",
    title: "DIY Projects",
    description: "Creative and fun DIY projects for home.",
    category: "DIY",
  },
];

const PAGE_SIZE = 6; // Number of blogs per page

function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  const scrollRef = useRef(null); // Reference for scrolling

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Filter blogs based on search input and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate total pages based on filtered blogs
  const totalPages = Math.ceil(filteredBlogs.length / PAGE_SIZE);

  // Get blogs for the current page
  const blogsToDisplay = filteredBlogs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Latest blogs (last 6 blogs)
  const latestBlogs = blogs.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 20; // Adjust the scroll amount
        if (
          scrollRef.current.scrollTop >=
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight
        ) {
          scrollRef.current.scrollTop = 0; // Reset to top when reaching the end
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
              {blogsToDisplay.length > 0 ? (
                blogsToDisplay.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <p>No blogs found.</p>
              )}
            </div>

            {/* Icon-Based Pagination Controls */}
            <div className="flex justify-center ml-80 mt-8 mb-4">
              <button
                onClick={handlePrevPage}
                className={`mr-2 p-2 rounded-full bg-navy text-white ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-lightblue"
                }`}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={8} />
              </button>
              <span className="px-4 py-2 text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className={`ml-2 p-2 rounded-full bg-navy text-white ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-lightblue"
                }`}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={8} />
              </button>
            </div>
          </div>

          {/* Sidebar for categories */}
          <div className="w-1/4 ml-4">
            <div className="bg-navy text-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul>
                {[
                  "Travel",
                  "Fashion",
                  "Cooking",
                  "Technology",
                  "Health",
                  "DIY",
                  "Photography",
                ].map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`mb-2 cursor-pointer hover:text-lightblue ${
                      selectedCategory === category
                        ? "font-bold text-lightblue"
                        : ""
                    }`}
                  >
                    {category}
                  </li>
                ))}
                <li
                  onClick={() => handleCategoryClick("")}
                  className={`mb-2 cursor-pointer hover:text-lightblue ${
                    selectedCategory === "" ? "font-bold text-lightblue" : ""
                  }`}
                >
                  Show All
                </li>
              </ul>
            </div>

            {/* Latest Blog Section with Scrolling Effect */}
            <div className="bg-white mt-8 p-4 rounded-lg shadow-lg border border-navy overflow-hidden">
              <h2 className="text-xl font-semibold mb-1 p-2 bg-navy text-white rounded-lg">
                Latest Blogs🔥
              </h2>

              <div className="h-64 overflow-hidden" ref={scrollRef}>
                <ul>
                  {latestBlogs.map((blog) => (
                    <li
                      key={blog.id}
                      className="flex items-start my-2 p-2 rounded-lg hover:bg-lightblue"
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-16 rounded-lg mr-2"
                      />
                      <div>
                        <h3 className="font-semibold">{blog.title}</h3>
                        <p className="text-gray-600">{blog.description}</p>
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
