# Book_Strore

A modern MERN (MongoDB, Express, React, Node.js) Book Store web application for discovering, buying, and exploring a world of books and courses.

## Features
- Browse a curated collection of books and courses
- View detailed information about each book/course
- User signup and login (with mock fallback if backend is offline)
- Buy Now flow with quantity, address, and payment modal
- Responsive, modern UI with Tailwind CSS and Bootstrap
- Admin panel for managing courses (add, edit, delete)
- Free courses section
- Thank you page after purchase

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Bootstrap, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other Libraries:** Axios, React Hook Form, React Hot Toast, React Modal, React Slick, Slick Carousel

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Abhi20052025/BookStore-Mern-Back-End-.git
cd Book_Strore-main
```

#### 2. Install dependencies for both frontend and backend
```bash
cd Backend
npm install
cd ../Frontend
npm install
```

#### 3. Set up environment variables
- In `Backend/`, create a `.env` file with your MongoDB URI and any other secrets:
  ```env
  MONGO_URI=your_mongodb_connection_string
  PORT=4000
  ```

#### 4. Start the backend server
```bash
cd Backend
npm start
```

#### 5. Start the frontend dev server
```bash
cd ../Frontend
npm run dev
```

- Frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)
- Backend will run on [http://localhost:4000](http://localhost:4000)

## Usage
- Visit the home page to browse books and free courses
- Sign up or log in to access the full course catalog
- Click "Buy Now" to purchase a book/course (with payment modal)
- Admins can manage courses from the admin panel

## Folder Structure
```
Book_Strore-main/
  Backend/      # Express/MongoDB backend
  Frontend/     # React frontend
```

## License
This project is licensed under the ISC License.

## Author
Abhishek Kumar Pandey
