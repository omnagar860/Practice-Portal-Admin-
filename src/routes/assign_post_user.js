import express from "express";
import { assignPostTouser,getUsersAllPost  } from "../controllers/assign-post-user.controller.js";

const router = express.Router();

router.post("/assignPostToUser/:id", assignPostTouser);
router.get("/getUserPost/:id", getUsersAllPost)

export default router;