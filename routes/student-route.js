const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload")

router.get("/enrollment", authenticate, studentController.getStudent);
router.get("/major", studentController.getMajor);
router.get("/class", studentController.getClass);
router.get("/gender",studentController.getGender)
router.get("/nation", studentController.getNationality)
router.get("/me", authenticate,studentController.me);
router.get("/search/",authenticate,studentController.searchData)
router.get("/year/",authenticate,studentController.searchYear)
router.get("/cls/",authenticate,studentController.searchClass)

router.post("/add", upload.array("image", 2),authenticate, studentController.studentCreate);

router.delete("/del/:std_id",authenticate,studentController.delData)

router.patch("/reject/:std_id",studentController.rejectStatus)
router.patch("/upstatus/:std_id", studentController.updateStatus)
router.patch("/update/:std_id",  studentController.updateData)
module.exports = router;
