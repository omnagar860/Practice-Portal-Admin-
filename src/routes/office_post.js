import express from "express";
import { addPostInOffice, deletePostFromOffice, getAllPostForOffice } from "../controllers/office_post.controller.js";


const router = express.Router();
router.get("/getAllPost/:id", getAllPostForOffice)
router.post("/addPostInOffice/:id", addPostInOffice)
router.post("/deletePostInOffice/:officeId/:postId", deletePostFromOffice)

export default router;