import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function EditCourseModal({ show, hide, course, onCourseUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    instructor: '',   
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize form data when course prop changes
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        description: course.description || '',
        duration: course.duration || '',
        instructor: course.instructor || '',
        price: course.price || '',
      });
      setImagePreview(course.image ? `http://localhost:4000${course.image}` : '');
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { name, description, duration, instructor, price } = formData;

      if (!name || !description || !duration || !instructor) {
        alert('Please fill all required fields.');
        return;
      }

      // Step 1: Update course data
      const res = await axios.put(`http://localhost:4000/course/${course._id}`, {
        ...formData,
        price: Number(price) || 0,
      });

      const updatedCourse = res.data;

      // Step 2: Upload new image if file is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await axios.post(
          `http://localhost:4000/course/upload-image/${course._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      if (onCourseUpdated) onCourseUpdated(updatedCourse);

      // Reset form and close modal
      hide();
      setImageFile(null);
    } catch (err) {
      console.error('Failed to update course:', err);
      alert(err.response?.data?.message || 'Something went wrong while updating the course.');
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

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
      <h2>Edit Course</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Course Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description *</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
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
            value={formData.duration}
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
            value={formData.instructor}
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
            value={formData.price}
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
          Cancel
        </button>
        <button className="btn btn-primary ms-2" onClick={handleSave} disabled={loading}>
          {loading ? 'Updating...' : 'Update Course'}
        </button>
      </div>
    </Modal>
  );
}

export default EditCourseModal;