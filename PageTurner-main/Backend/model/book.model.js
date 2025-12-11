import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    avatar: {
        type: String,
        default: "",
        required: false,
      },
    
    title: String,
});
const Book = mongoose.model("Book", bookSchema);

export default Book;