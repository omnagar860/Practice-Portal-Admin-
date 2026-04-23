// routes/privileges.routes.js
import express from "express";
import { getPrivilegesByOfficePost, savePrivileges } from "../controllers/priviliges.controller.js";

const router = express.Router();

router.post("/save", savePrivileges);
router.get("/:officeId/:postId", getPrivilegesByOfficePost);

export default router;
