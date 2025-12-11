import Course from "../model/course.model.js";

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const { name, description, duration, instructor, price } = req.body;
        
        if (!name || !description || !duration || !instructor) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const existingCourse = await Course.findOne({ name });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this name already exists" });
        }

        const newCourse = new Course({
            name,
            description,
            duration,
            instructor,
            price: price || 0,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error("Create Course Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all courses
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true }).sort({ dateCreated: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Get Courses Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get course by ID
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        res.status(200).json(course);
    } catch (error) {
        console.error("Get Course Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update course
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, duration, instructor, price } = req.body;
        
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if name is being changed and if it conflicts with another course
        if (name && name !== course.name) {
            const existingCourse = await Course.findOne({ name, _id: { $ne: id } });
            if (existingCourse) {
                return res.status(400).json({ message: "Course with this name already exists" });
            }
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            {
                name: name || course.name,
                description: description || course.description,
                duration: duration || course.duration,
                instructor: instructor || course.instructor,
                price: price !== undefined ? price : course.price,
            },
            { new: true }
        );

        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error("Update Course Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete course (soft delete)
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Soft delete by setting isActive to false
        await Course.findByIdAndUpdate(id, { isActive: false });
        
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Delete Course Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Upload course image
export const uploadCourseImage = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Update course with image path
        const imagePath = `/assets/images/${req.file.filename}`;
        await Course.findByIdAndUpdate(id, { image: imagePath });

        res.status(200).json({ 
            message: "Course image uploaded successfully",
            imagePath: imagePath
        });
    } catch (error) {
        console.error("Upload Course Image Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 