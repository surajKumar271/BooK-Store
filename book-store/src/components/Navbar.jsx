import React from "react";
//import "./Navbar.css"; // optional if you want separate CSS

// Categories for navbar
const categories = ["Fiction", "Science", "Technology", "History", "Business"];

const Navbar = ({ searchTerm, setSearchTerm, setCategory, user, setIsLoggedIn }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <h1 className="logo">BooksStore</h1>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => {
          setCategory("");
          setSearchTerm(e.target.value);
        }}
      />

      {/* Logout button aligned right */}
      {user && (
        <button
          className="logout-btn"
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
