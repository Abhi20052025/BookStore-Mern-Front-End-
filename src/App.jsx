import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages & Components
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import BuyNow from "./components/BuyNow";
import ThankYou from "./components/ThankYou";
import Contact from "./components/Contact";
import About from "./components/About";
import CourseList from "./admin/cource/course-list";
import ViewDetails from "./components/ViewDetails";
import { useAuth } from "./context/AuthProvider";
import BuyModal from "./components/BuyModal";
import { useState } from "react";

function App() {
  const [authUser] = useAuth();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [buyProduct, setBuyProduct] = useState(null);

  // Function to open buy modal from anywhere
  const openBuyModal = (product) => {
    setBuyProduct(product);
    setBuyModalOpen(true);
  };
  const closeBuyModal = () => {
    setBuyModalOpen(false);
    setBuyProduct(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home openBuyModal={openBuyModal} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Protected Route */}
        <Route
          path="/course"
          element={authUser ? <Courses openBuyModal={openBuyModal} /> : <Navigate to="/signup" />}
        />
        {/* View Details Route */}
        <Route path="/book/:isbn13" element={<ViewDetails openBuyModal={openBuyModal} />} />
        {/* Purchase Flow (legacy) */}
        <Route path="/buy/:id" element={<BuyNow />} />
        <Route path="/thank-you" element={<ThankYou />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<Outlet />}>
          <Route path="course" element={<CourseList />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
      {/* Global Buy Modal */}
      {buyModalOpen && buyProduct && (
        <BuyModal product={buyProduct} onClose={closeBuyModal} />
      )}
    </div>
  );
}

export default App;
