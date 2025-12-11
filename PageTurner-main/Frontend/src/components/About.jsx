import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Book Store</h1>
          <p className="text-xl opacity-90">  
            
            Discover our story and mission to bring the world of books to your fingertips
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto py-10 px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Our Story</h2>
          <p className="mb-6 text-lg text-gray-700 text-center">
            <strong className="text-gray-900">Book Store</strong> is your one-stop destination for discovering, buying, and exploring a world of books. Whether you are a passionate reader, a student, or someone looking for the perfect gift, our platform brings you a curated collection of books across genres, authors, and interests.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Our Mission</h3>
            <p className="text-gray-700">
              We believe in the power of stories and knowledge. Our mission is to make books accessible to everyone, foster a love for reading, and support lifelong learning. We strive to provide a seamless, enjoyable, and affordable book-buying experience for all our users.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Wide selection of books: From bestsellers to rare finds</li>
              <li>Easy and secure online shopping</li>
              <li>Personalized recommendations</li>
              <li>Fast delivery and excellent customer support</li>
              <li>Community features for book lovers</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Meet the Team</h3>
            <p className="text-gray-700">
              Our team is made up of book enthusiasts, tech experts, and customer service professionals dedicated to making your experience outstanding. We are always here to help you find your next great read!
            </p>
          </div>
          <div className="text-center mt-8">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              Thank you for being a part of our story!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 