import express from "express";
import { 
    createCourse, 
    getCourses, 
    getCourseById, 
    updateCourse, 
    deleteCourse, 
    uploadCourseImage 
} from "../controller/course.controller.js";
import multer from 'multer';

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Course routes
router.post('/create', createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/upload-image/:id', upload.single('image'), uploadCourseImage);

export default router; 