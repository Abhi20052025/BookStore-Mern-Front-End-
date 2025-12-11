// import React from "react";
// import { useLocation, useParams, Link, useNavigate } from "react-router-dom";

// function BuyNow() {
//   const { state } = useLocation();
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const book = state?.book;

//   const handlePayment = () => {
//     // Navigate directly to thank you page on click
//     navigate("/thank-you");
//   };

//   if (!book) {
//     return (
//       <div className="text-center mt-20 px-4">
//         <h2 className="text-xl font-semibold text-red-600">Book not found!</h2>
//         <Link
//           to="/"
//           className="mt-4 inline-block text-pink-600 hover:underline"
//         >
//           ← Go back home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto mt-20 px-4">
//       <div className="flex flex-col md:flex-row gap-8">
//         <img
//           src={book.image || "/placeholder.jpg"}
//           alt={book.title || "Book Cover"}
//           className="w-full md:w-1/2 h-auto object-cover rounded shadow-md"
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
//           <p className="text-lg text-gray-600 mb-2">{book.subtitle || "No subtitle provided"}</p>
//           <p className="text-xl font-semibold text-pink-600 mb-4">
//             {book.price || "Free"}
//           </p>
//           <p className="text-sm text-justify mb-6 text-gray-700">
//             This is a placeholder for detailed book information. You can add features like payment integration, author bio, and reviews here.
//           </p>

//           <button
//             onClick={handlePayment}
//             className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 duration-300"
//           >
//             Proceed to Payment
//           </button>

//           <Link
//             to="/course"
//             className="mt-4 block text-sm text-gray-500 hover:text-pink-500 transition duration-200"
//           >
//             ← Back to Course List
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BuyNow;



import React, { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";

function BuyNow() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const book = state?.book;
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => {
    setShowModal(true);
  };

  const handleFakePayment = () => {
    setShowModal(false);
    navigate("/thank-you");
  };

  if (!book) {
    return (
      <div className="text-center mt-20 px-4">
        <h2 className="text-xl font-semibold text-red-600">Book not found!</h2>
        <Link
          to="/"
          className="mt-4 inline-block text-pink-600 hover:underline"
        >
          ← Go back home
        </Link>
      </div>
    );
  }

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

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 relative">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.image || "/placeholder.jpg"}
          alt={book.title || "Book Cover"}
          className="w-full md:w-1/2 h-auto object-cover rounded shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-2">{book.subtitle || "No subtitle provided"}</p>
          <p className="text-xl font-semibold text-pink-600 mb-4">
            {formatPrice(book.price)}
          </p>
          <p className="text-sm text-justify mb-6 text-gray-700">
            This is a placeholder for detailed book information. You can add features like payment integration, author bio, and reviews here.
          </p>

          <button
            onClick={handlePayment}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 duration-300"
          >
            Proceed to Payment
          </button>

          <Link
            to="/course"
            className="mt-4 block text-sm text-gray-500 hover:text-pink-500 transition duration-200"
          >
            ← Back to Course List
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <p className="text-sm text-gray-700 mb-4">
              You're about to purchase <span className="font-medium">{book.title}</span> for <span className="text-pink-600 font-semibold">{formatPrice(book.price)}</span>
            </p>

            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              onClick={handleFakePayment}
              className="bg-pink-600 w-full text-white py-2 rounded hover:bg-pink-700 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyNow;
