import express from "express";
import DocumentManagerController from "../controller/document.manager.controller";
import { fileUploader } from "../middleware/fileUploader";


const router = express.Router()


router.post('/upload/encrypt', fileUploader.single('secretFile'), DocumentManagerController.handleUpload )

export default router;
