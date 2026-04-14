import express from "express";
import { validate } from "../request/admin.request.js";
import { admin_createPost } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/create_post",  admin_createPost)

export default router;