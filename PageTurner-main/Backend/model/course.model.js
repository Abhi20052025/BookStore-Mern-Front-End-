import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "",
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

const Course = mongoose.model("Course", courseSchema);

export default Course; 