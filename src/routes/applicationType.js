import express from "express";
import { createNewApplication, deleteApplication, getAllApplication, updateApplication } from "../controllers/application-type.controller.js";

const router = express.Router();

router.post("/createNewApplication", createNewApplication)
router.get("/getAllApplication", getAllApplication)
router.post("/updateApplication/:id", updateApplication)
router.post("/deleteApplication/:id", deleteApplication)





export default router;