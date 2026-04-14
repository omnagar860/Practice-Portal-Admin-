import express from "express"
import { getAllOffice } from "../controllers/office.controller.js";

const router = express.Router();


router.get("/getAllOffice", getAllOffice)




export default router