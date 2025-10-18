import React from "react";

const BookCard = ({ book, onClick }) => {
  const info = book.volumeInfo;
  return (
    <div className="book-card" onClick={onClick}>
      <img
        src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
        alt={info.title}
      />
      <h3>{info.title}</h3>
      <p>{info.authors ? info.authors.join(", ") : "Unknown Author"}</p>
    </div>
  );
};

export default BookCard;
