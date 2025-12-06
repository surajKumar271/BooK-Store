import React from "react";
// import "./Navbar.css"; // optional if you want separate CSS

// Categories for navbar
const categories = ["Fiction", "Science", "Technology", "History", "Business"];

const Navbar = ({
  searchTerm,
  setSearchTerm,
  setCategory,
  user,
  setIsLoggedIn,
  setUser, // ✅ receive setUser from parent
}) => {
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false);             // Update login state
    setUser(null);                    // Clear user info
  };

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
          setCategory("");           // Reset category when searching
          setSearchTerm(e.target.value);
        }}
      />

      {/* Logout button */}
      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
