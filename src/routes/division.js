import express from "express";
import { getMasterCityData, getMasterDivisionData } from "../controllers/master.controller.js";
import { createDivision, deleteDivisionById, getAllDivision, updateDivisionById } from "../controllers/division.js";
const router = express.Router();

// router.get("/city", getMasterCityData)
// post to add 1 division
// get all divison 
// get division by id 
// deactivate divison
// update division


router.post("/create-division", createDivision);
router.get("/getAllDivision", getAllDivision);
router.delete("/deletedivision/:id", deleteDivisionById)
router.post("/updateDivision/:id", updateDivisionById)


export default router