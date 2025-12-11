import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

function Home({ openBuyModal }) {
  return (
    <>
      <Navbar />
      <Banner />
      <Freebook openBuyModal={openBuyModal} />
      <Footer />
    </>
  );
}

export default Home;
