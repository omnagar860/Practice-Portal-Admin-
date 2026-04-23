import express from "express";
import { createDistrict, deleteDistrictById, getAllDistrict, getDistrictByDivisionId, getDistrictById, updateDistrictById } from "../controllers/district.controller.js";


const router = express.Router();


router.post("/createDistrict", createDistrict);
router.get("/getAllDistrict", getAllDistrict);
router.get("/getDistrictById/:id", getDistrictById);
router.get("/getDistrictByDivisionId/:id", getDistrictByDivisionId);
router.post("/updateDistrict/:id", updateDistrictById);
router.post("/deleteDistrict/:id", deleteDistrictById);


export default router