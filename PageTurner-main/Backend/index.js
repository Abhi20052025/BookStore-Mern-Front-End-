import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import courseRoute from "./route/course.route.js";
import { fileURLToPath } from 'url';
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets/images", express.static(path.join(__dirname,"assets/images")))

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/course", courseRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});