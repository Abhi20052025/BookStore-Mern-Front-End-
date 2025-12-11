import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseList.css';
import AddCourseModal from './add-course';
import EditCourseModal from './edit-course';

const CourseList = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:4000/course');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCourseAdded = (newCourse) => {
    setCourses([newCourse, ...courses]);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(courses.map(course => 
      course._id === updatedCourse._id ? updatedCourse : course
    ));
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:4000/course/${id}`);
        setCourses(courses.filter(course => course._id !== id));
        alert('Course deleted successfully');
      } catch (err) {
        console.error('Error deleting course:', err);
        alert('Failed to delete course');
      }
    }
  };

  const editCourse = (course) => {
    setSelectedCourse(course);
    setEditModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Utility to convert $ to ₹
  function formatPrice(price) {
    if (!price || price === "Free") return "Free";
    if (typeof price === "number") return `₹${Math.round(price * 83)}`;
    const match = String(price).match(/\$(\d+(?:\.\d+)?)/);
    if (match) {
      const usd = parseFloat(match[1]);
      const inr = Math.round(usd * 83);
      return `₹${inr}`;
    }
    return price;
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Course Management</h2>
        <button className="btn btn-primary" onClick={() => setAddModal(true)}>
          <i className="fas fa-plus"></i> Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No courses found</h4>
          <p>Click "Add Course" to create your first course.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Course Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Instructor</th>
                <th>Price</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {course.image && (
                        <img 
                          src={`http://localhost:4000${course.image}`} 
                          alt={course.name}
                          style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                        />
                      )}
                      <strong>{course.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {course.description}
                    </div>
                  </td>
                  <td>{course.duration}</td>
                  <td>{course.instructor}</td>
                  <td>{formatPrice(course.price || 0)}</td>
                  <td>{formatDate(course.dateCreated)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => editCourse(course)}
                        title="Edit Course"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn btn-danger btn-sm ms-1" 
                        onClick={() => deleteCourse(course._id)}
                        title="Delete Course"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCourseModal 
        show={addModal} 
        hide={() => setAddModal(false)} 
        onCourseAdded={handleCourseAdded}
      />

      {selectedCourse && (
        <EditCourseModal 
          show={editModal} 
          hide={() => {
            setEditModal(false);
            setSelectedCourse(null);
          }} 
          course={selectedCourse}
          onCourseUpdated={handleCourseUpdated}
        />
      )}
    </div>
  );
};

export default CourseList;
