import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Register from "./components/register"; // import registration page
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("react");
  const [selectedBook, setSelectedBook] = useState(null);
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [showRegister, setShowRegister] = useState(false); // toggle between login/register

  const fetchBooks = async () => {
    try {
      const q = category || searchTerm || "react";
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=20`
      );
      setBooks(res.data.items || []);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchBooks();
  }, [searchTerm, category, isLoggedIn]);

  return (
    <div className="app">
      {!isLoggedIn ? (
        showRegister ? (
          <Register
            onRegistered={() => setShowRegister(false)} // switch to login after registration
          />
        ) : (
          <LoginPage
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
            switchToRegister={() => setShowRegister(true)} // allow switching
          />
        )
      ) : (
        <>
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCategory={setCategory}
            user={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setCurrentUser}
          />
          <main className="main-section">
            {books.length ? (
              <div className="book-grid">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            ) : (
              <p>No books found</p>
            )}
          </main>
          {selectedBook && (
            <BookModal
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
