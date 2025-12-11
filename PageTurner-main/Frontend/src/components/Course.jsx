// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// function Course() {
//   const [book, setBook] = useState([]);
//   useEffect(() => {
//     const getBook = async () => {
//       try {
//         const res = await axios.get("https://api.itbook.store/1.0/new");
//         console.log(res.data);
//         setBook(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getBook();
//   }, []);
//   return (
//     <>
//       <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
//         <div className="mt-28 items-center justify-center text-center">
//           <h1 className="text-2xl  md:text-4xl">
//             We're delighted to have you{" "}
//             <span className="text-pink-500"> Here! :)</span>
//           </h1>
//           <p className="mt-12">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro,
//             assumenda? Repellendus, iste corrupti? Tempore laudantium
//             repellendus accusamus accusantium sed architecto odio, nisi expedita
//             quas quidem nesciunt debitis dolore non aspernatur praesentium
//             assumenda sint quibusdam, perspiciatis, explicabo sequi fugiat amet
//             animi eos aut. Nobis quisquam reiciendis sunt quis sed magnam
//             consequatur!
//           </p>
//           <Link to="/">
//             <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
//               Back
//             </button>
//           </Link>
//         </div>
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
//           {book.map((item) => (
//             <Cards key={item.id} item={item} img={ `http://localhost:4001/assets/images/${item.avatar} `} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Course;




import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course({ openBuyModal }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("https://api.itbook.store/1.0/new");
        console.log(res.data.books);
        setBooks(res.data.books); // Use the books array
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        {/* <h1 className="text-2xl md:text-4xl">
          We're delighted to have you <span className="text-pink-500">Here! :)</span>
        </h1> */}
        {/* <p className="mt-12">
          Explore our carefully curated collection of books that will inspire, educate, and entertain. 
          From programming guides to business insights, discover knowledge that transforms your perspective 
          and helps you grow in your personal and professional journey.
        </p> */}
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {books.map((item) => (
          <Cards key={item.isbn13} item={item} openBuyModal={openBuyModal} />
        ))}
      </div>
    </div>
  );
}

export default Course;
