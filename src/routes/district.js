import express from "express";
import { createDistrict, deleteDistrictById, getAllDistrict, getDistrictById, updateDistrictById } from "../controllers/district.controller.js";


const router = express.Router();


router.post("/createDistrict", createDistrict);
router.get("/getAllDistrict", getAllDistrict);
router.get("/getDistrictById/:id", getDistrictById);
router.put("/updateDistrict/:id", updateDistrictById);
router.delete("/deleteDistrict/:id", deleteDistrictById);
// router.post("createDistrict", createDistrict);
// router.get("/getAllDistrict", getAllDistrict);
// router.put("/updateDistrictById/:id", updateDistrictById);
// router.delete("deleteDistrictById/:id", deleteDistrictById)


export default router