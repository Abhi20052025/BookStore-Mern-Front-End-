import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto py-10 px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Contact Information</h2>
          <p className="mb-8 text-center text-gray-700">
            Have a question, suggestion, or need help? Reach out to us!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <i className="fas fa-map-marker-alt text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Address</h3>
              <p className="text-gray-700 text-center">
                123 Book Street<br />
                Knowledge City, KC 12345<br />
                United States
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <i className="fas fa-phone-alt text-3xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Phone</h3>
              <p className="text-gray-700 text-center">
                +1 (555) 123-4567<br />
                +1 (555) 987-6543
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="mb-4">
              <i className="fas fa-envelope text-3xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-700 text-center">
              info@bookstore.com<br />
              support@bookstore.com
            </p>
          </div>
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-blue-500 hover:text-blue-700 text-2xl transition-colors"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-sky-400 hover:text-sky-600 text-2xl transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-blue-700 hover:text-blue-900 text-2xl transition-colors"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 