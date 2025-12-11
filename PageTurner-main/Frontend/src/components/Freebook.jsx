import React, { useEffect, useState } from "react";
import list from "/public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";

function Freebook({ openBuyModal }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Filter only free category books
    const freeBooks = list.filter((book) => book.category === "Free");
    setBooks(freeBooks);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-10">
      <div className="mb-6">
        <h1 className="font-semibold text-2xl pb-2">Free Offered Courses</h1>
        <p className="text-gray-600">
          Explore a selection of free educational content across various fields.
          Start learning without spending a dime.
        </p>
      </div>

      {books.length > 0 ? (
        <Slider {...settings}>
          {books.map((item) => (
            <Cards item={item} key={item.id} openBuyModal={openBuyModal} />
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 mt-10">No free books available right now.</p>
      )}
    </div>
  );
}

export default Freebook;
