import express from "express";
import { getUserPermissions, saveUserPermissions } from "../controllers/user_permission.controller.js";


const router = express.Router();

router.post("/save", saveUserPermissions);
router.get("/:id", getUserPermissions);

export default router;
