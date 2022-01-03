import { Router } from "express";

// middlewares
import multer from "multer";

// handlers
import { imageRecognition } from "../controllers/products/imageRecognition/imageRecognition";

const router: Router = Router();

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 10 * 1024 * 1024 }, // 10mb
});

router.post("/imageRecognition", upload.single("image"), imageRecognition);

export default router;
