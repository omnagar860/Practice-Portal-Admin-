import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUserData, loginUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/createUser", createUser)
router.post("/login", loginUser)
router.get("/getAllUsers", getAllUsers);
router.get("/getSingleUserData/:id", getSingleUserData);
router.post("/updateuser/:id", updateUser)
router.post("/deleteuser/:id",deleteUser)


export default router