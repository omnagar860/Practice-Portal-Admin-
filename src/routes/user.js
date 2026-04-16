import express from "express";
import { createUser, getAllUsers, loginUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/createUser", createUser)
router.post("/login", loginUser)
router.get("/getAllUsers", getAllUsers);


export default router