import React, { useState } from "react";
import ThankYou from "./ThankYou";

function CartModal({ book, onClose }) {
  const stock = book.stock === undefined ? 10 : book.stock;
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(1); // 1: details, 2: payment, 3: success
  const [buying, setBuying] = useState(false);

  const priceNum = parseFloat((book.price || "0").replace(/[^\d.]/g, ""));
  const total = (isNaN(priceNum) ? 0 : priceNum) * quantity;

  // Payment fields
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleBuy = () => {
    setBuying(true);
    setTimeout(() => {
      setBuying(false);
      setStep(3);
    }, 1200);
  };

  // Validation for payment step
  let canPay = false;
  if (paymentMethod === "card") {
    canPay = cardNumber && expiry && cvv && cardName;
  } else if (paymentMethod === "upi") {
    canPay = upiId;
  } else if (paymentMethod === "cod") {
    canPay = true;
  }

  if (step === 3) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative text-center animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-green-600 text-2xl font-bold"
        >
          &times;
        </button>
        <ThankYou />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg relative animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
      >
        &times;
      </button>
      {step === 1 && (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <img
              src={book.image || "/placeholder.jpg"}
              alt={book.title || "Book Cover"}
              className="w-32 h-40 object-cover rounded shadow-md mx-auto md:mx-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{book.title}</h3>
              <p className="text-gray-600 mb-1">{book.author}</p>
              <p className="text-pink-600 font-bold mb-2">{book.price}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Quantity:</span>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="px-3 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  disabled={quantity === stock}
                >
                  +
                </button>
                <span className="ml-2 text-xs text-gray-500">({stock} in stock)</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700">Shipping Address</label>
            <textarea
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              placeholder="Enter your address..."
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg">Total:</span>
            <span className="text-xl text-pink-600 font-bold">₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 duration-200 text-lg font-semibold shadow-lg disabled:opacity-60"
            disabled={!address || quantity < 1}
          >
            Proceed to Payment
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
          <p className="text-sm text-gray-700 mb-4">
            You're about to purchase <span className="font-medium">{book.title}</span> for <span className="text-pink-600 font-semibold">₹{total.toFixed(2)}</span>
          </p>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700">Select Payment Method</label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
          </div>
          {paymentMethod === "card" && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                maxLength={19}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  maxLength={5}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  maxLength={4}
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
            </>
          )}
          {paymentMethod === "upi" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
            />
          )}
          {paymentMethod === "cod" && (
            <div className="mb-4 text-green-700 font-semibold">You will pay on delivery.</div>
          )}
          <button
            onClick={handleBuy}
            className="bg-pink-600 w-full text-white py-2 rounded hover:bg-pink-700 transition text-lg font-semibold shadow-lg disabled:opacity-60"
            disabled={buying || !canPay}
          >
            {buying ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </div>
  );
}

export default CartModal; 