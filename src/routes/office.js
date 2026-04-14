import express from "express"
import { updateOffice, getAllOffice, deleteOffice, createOffice } from "../controllers/office.controller.js";

const router = express.Router();

router.post("/createOffice", createOffice)
router.get("/getAllOffice", getAllOffice)
router.post("/updateOffice/:id", updateOffice)
router.post("/deleteOffice/:id", deleteOffice)





export default router