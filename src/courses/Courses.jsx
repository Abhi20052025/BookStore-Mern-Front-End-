import React from "react";
import Navbar from "../components/Navbar";
import Course from "../components/Course";
import Footer from "../components/Footer";
function Courses({ openBuyModal }) {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Course openBuyModal={openBuyModal} />
      </div>
      <Footer />
    </>
  );
}

export default Courses;
