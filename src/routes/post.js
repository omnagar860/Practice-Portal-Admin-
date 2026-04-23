import express from "express";
import { createPost, getAllPost, updatePost ,deletePost, getPostByOfficeId} from "../controllers/post.controller.js";


const router = express.Router();


router.post("/createPost",createPost)
router.get("/getAllPost",getAllPost)
router.post("/updatePost/:id",updatePost)
router.post("/deltePost/:id",deletePost)
router.get("/getpostbyofficeid/:id", getPostByOfficeId)


export default router