import express from "express";
import { createPost, getAllPost, updatePost ,deletePost} from "../controllers/post.controller.js";


const router = express.Router();


router.post("/createPost",createPost)
router.get("/getAllPost",getAllPost)
router.post("/updatePost/:id",updatePost)
router.post("/deltePost/:id",deletePost)


export default router