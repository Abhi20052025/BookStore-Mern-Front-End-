import Book from "../model/book.model.js";
import multer from 'multer'

export const createBooks =async(req,res)=>{
const {name, price,category,title} = req.body
const books= await Book.findOne({name:name})
if(books){
   return res.status(400).json({message:"Book already exist"})
}
if(!name,!price,!category,!title){
  return  res.status(400).json({message:"All fields are required"})
}
const newBook = new Book({
    name, price,category,title
})
try{
    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
}catch(e){
    res.status(500).json({message:e})
}
}


export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const uploadAvatar = async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      book.avatar = req.file.originalname;
      await book.save();
  
      res.json({ message: "Avatar image uploaded successfully" });
    } catch (error) {
      console.error("Error uploading avatar image: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }