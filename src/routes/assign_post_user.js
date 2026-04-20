import express from "express";
import { assignPostTouser } from "../controllers/assign-post-user.controller.js";

const router = express.Router();

router.post("/assignPostToUser/:id", assignPostTouser)

export default router;