import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function AddCourseModal({ show, hide, onCourseAdded }) {
  const [course, setCourse] = useState({
    name: '',
    description: '',
    duration: '',   
    instructor: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { name, description, duration, instructor, price } = course;

      if (!name || !description || !duration || !instructor) {
        alert('Please fill all required fields.');
        return;
      }

      // Step 1: Create course (without image)
      const res = await axios.post('http://localhost:4000/course/create', {
        ...course,
        price: Number(price) || 0,
        image: '' // image will be updated later if image is uploaded
      });

      const createdCourse = res.data;

      // Step 2: Upload image if file is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await axios.post(
          `http://localhost:4000/course/upload-image/${createdCourse._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      if (onCourseAdded) onCourseAdded(createdCourse);

      // Reset form
      hide();
      setCourse({ name: '', description: '', duration: '', instructor: '', price: '' });
      setImageFile(null);
      setImagePreview('');
    } catch (err) {
      console.error('Failed to save course:', err);
      alert(err.response?.data?.message || 'Something went wrong while saving the course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={hide}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxHeight: '80vh',
          overflow: 'auto',
        },
      }}
    >
      <h2>Add New Course</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Course Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description *</label>
          <textarea
            className="form-control"
            name="description"
            value={course.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration *</label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="e.g., 3 weeks, 2 months"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instructor *</label>
          <input
            type="text"
            className="form-control"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={course.price}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100px', marginTop: '10px' }}
            />
          )}
        </div>
      </form>
      <div>
        <button className="btn btn-secondary" onClick={hide} disabled={loading}>
          Close
        </button>
        <button className="btn btn-primary ms-2" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Course'}
        </button>
      </div>
    </Modal>
  );
}

export default AddCourseModal;
