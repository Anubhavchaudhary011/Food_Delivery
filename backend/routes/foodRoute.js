import express from "express";
import { addFood ,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

// Ensure 'uploads' folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// image
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
foodRouter.get('/list', listFood)
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/remove",removeFood)
export default foodRouter;
