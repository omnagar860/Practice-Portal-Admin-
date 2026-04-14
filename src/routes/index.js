import express from "express";
import adminRouter from "./admin.js";
import divisionRouter from "./division.js";
import districtRouter from "./district.js"
import officeRouter from "./office.js"
import postRouter from "./post.js"

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/division", divisionRouter);
router.use("/district", districtRouter);
router.use("/office", officeRouter);
router.use("/post", postRouter);

export default router;