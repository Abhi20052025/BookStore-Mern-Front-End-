// src/components/ThankYou.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-20 px-4">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-gray-700">Thank you for purchasing the course.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
         Back to Home
      </button>
    </div>
  );
}

export default ThankYou;
