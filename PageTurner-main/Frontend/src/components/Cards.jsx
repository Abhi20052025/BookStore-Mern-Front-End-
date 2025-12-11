import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartModal from "./Cart";

// Utility to convert $ to ₹
function formatPrice(price) {
  if (!price || price === "Free") return "Free";
  // Handle price like "$49.99"
  const match = price.match(/\$(\d+(?:\.\d+)?)/);
  if (match) {
    const usd = parseFloat(match[1]);
    const inr = Math.round(usd * 83); // 1 USD ≈ 83 INR
    return `₹${inr}`;
  }
  // If already in ₹ or unknown format, return as is
  return price;
}

function Cards({ item, openBuyModal }) {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const handleBuyNow = () => {
    navigate(`/buy/${item.isbn13}`, { state: { book: item } });
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/book/${item.isbn13}`, { state: { book: item } });
  };

  return (
    <div
      className="relative max-w-xs mx-auto bg-white rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border-t-8 border-blue-500 cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image with hover effect */}
      <div className="relative overflow-hidden h-44 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 rounded-t-2xl"
        />
        {item.category && (
          <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg z-10">
            {item.category}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-base font-extrabold text-gray-800 mb-1 line-clamp-2 min-h-[2.2rem] drop-shadow-sm">
          {item.title}
        </h2>
        {item.author && (
          <p className="text-xs text-gray-500 mb-1 font-medium">by {item.author}</p>
        )}
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 min-h-[1.5rem]">
          {item.subtitle}
        </p>
        <div className="flex items-center justify-between mb-3 mt-1">
          <span className="text-pink-600 font-bold text-lg drop-shadow">{formatPrice(item.price)}</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleViewDetails}
            className="flex-1 border-2 border-blue-500 text-blue-600 bg-white/80 hover:bg-blue-50 font-bold py-2 px-2 text-sm rounded-xl shadow transition-all duration-200"
          >
            View Details
          </button>
          <button
            onClick={e => { e.stopPropagation(); openBuyModal(item); }}
            className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-2 text-sm rounded-xl shadow-lg transition-all duration-200"
          >
            Buy Now
          </button>
        </div>
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <CartModal book={item} onClose={() => setShowCart(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;

