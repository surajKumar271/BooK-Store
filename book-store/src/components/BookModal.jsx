//This component is used to display a book modal
import React from "react";

const BookModal = ({ book, onClose }) => {
  const info = book.volumeInfo;
  //Get the book information
  const access = book.accessInfo;
  const sale = book.saleInfo;

  // Extract links
  const readLink = access?.webReaderLink || info?.previewLink || null;
  const buyLink = sale?.buyLink || null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>{info.title}</h2>
        <p>
          <strong>Author:</strong>{" "}
          {info.authors ? info.authors.join(", ") : "Unknown"}
        </p>
        <p>
          <strong>Publisher:</strong> {info.publisher || "Unknown"}
        </p>
        <p>
          <strong>Published:</strong> {info.publishedDate || "Unknown"}
        </p>

        <img
          src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"}
          alt={info.title}
          style={{
            width: "150px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "10px",
            margin: "15px 0",
          }}
        />

        <p style={{ textAlign: "justify" }}>
          {info.description || "No description available."}
        </p>

        {/* ✅ Read Online Section */}
        {readLink ? (
          <p style={{ marginTop: "10px" }}>
            <strong>📖 Read Online: </strong>
            <a
              href={readLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2575fc",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              Click here to read this book
            </a>
          </p>
        ) : (
          <p style={{ color: "gray", marginTop: "10px" }}>
            ❌ This book is not available for online reading.
          </p>
        )}

        {/* ✅ Buy Link Section */}
        {buyLink ? (
          <p style={{ marginTop: "8px" }}>
            <strong>💰 Buy this Book: </strong>
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#28a745",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              Click here to purchase
            </a>
          </p>
        ) : (
          <p style={{ color: "gray", marginTop: "8px" }}>
            🛒 Purchase option not available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookModal;
