import express from "express";
import { getBook , createBooks ,uploadAvatar} from "../controller/book.controller.js";
import multer from 'multer'
const router = express.Router();
router.post('/create',createBooks)
router.get("/", getBook);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/upload-avatar/:id",upload.single("avatar"),uploadAvatar);
  
export default router;