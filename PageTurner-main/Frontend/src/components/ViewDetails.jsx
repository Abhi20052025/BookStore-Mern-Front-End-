import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartModal from "./Cart";

function ViewDetails({ openBuyModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const book = location.state?.book;

  // Simulate stock (for demo, you can replace with real stock logic)
  const inStock = book && (book.stock === undefined || book.stock > 0);

  // Utility to convert $ to ₹
  function formatPrice(price) {
    if (!price || price === "Free") return "Free";
    const match = price.match(/\$(\d+(?:\.\d+)?)/);
    if (match) {
      const usd = parseFloat(match[1]);
      const inr = Math.round(usd * 83);
      return `₹${inr}`;
    }
    return price;
  }

  if (!book) {
    return (
      <div className="text-center mt-20 px-4">
        <h2 className="text-xl font-semibold text-red-600">Book not found!</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-block text-pink-600 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4 bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.image || "/placeholder.jpg"}
          alt={book.title || "Book Cover"}
          className="w-full md:w-1/3 h-auto object-cover rounded shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{book.subtitle || "No subtitle provided"}</p>
          <p className="text-xl font-semibold text-pink-600 mb-4">
            {formatPrice(book.price)}
          </p>
          {book.author && (
            <p className="mb-2 text-gray-700">Author: <span className="font-medium">{book.author}</span></p>
          )}
          {book.publisher && (
            <p className="mb-2 text-gray-700">Publisher: <span className="font-medium">{book.publisher}</span></p>
          )}
          {book.isbn13 && (
            <p className="mb-2 text-gray-700">ISBN-13: <span className="font-medium">{book.isbn13}</span></p>
          )}
          {book.year && (
            <p className="mb-2 text-gray-700">Year: <span className="font-medium">{book.year}</span></p>
          )}
          {book.pages && (
            <p className="mb-2 text-gray-700">Pages: <span className="font-medium">{book.pages}</span></p>
          )}
          {/* Detailed Description Section */}
          <div className="my-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-bold mb-2 text-blue-700">About this Product/Course</h2>
            <p className="text-gray-700">
              {book.desc || "This is a detailed description of the product or course. You can add more information here about the content, benefits, target audience, and more."}
            </p>
          </div>
          <button
            onClick={() => {
              if (inStock) openBuyModal(book);
              else setShowOutOfStock(true);
            }}
            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 duration-200 text-lg font-semibold shadow-lg"
          >
            Buy Now
          </button>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200"
          >
            Back
          </button>
        </div>
      </div>
      {/* Out of Stock Modal */}
      {showOutOfStock && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm relative text-center">
            <button
              onClick={() => setShowOutOfStock(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Out of Stock</h2>
            <p className="text-gray-700 mb-4">Sorry, this product is currently unavailable.</p>
            <button
              onClick={() => setShowOutOfStock(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails; 