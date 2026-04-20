import express from "express";
import adminRouter from "./admin.js";
import divisionRouter from "./division.js";
import districtRouter from "./district.js"
import officeRouter from "./office.js"
import postRouter from "./post.js"
import officePostRouter from "./office_post.js";
import userRouter from "./user.js"
import assignPostUserRouter from "./assign_post_user.js"

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/division", divisionRouter);
router.use("/district", districtRouter);
router.use("/office", officeRouter);
router.use("/post", postRouter);
router.use("/officePost", officePostRouter);
router.use("/user", userRouter);
router.use("/assign-post-user", assignPostUserRouter);

export default router;