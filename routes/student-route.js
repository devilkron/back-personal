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
router.get("/religion", studentController.getReligion)
router.get("/ethicity", studentController.getETH)
router.get("/me", authenticate,studentController.me);
router.get("/search/std*",authenticate,studentController.searchData)
router.get("/year/",authenticate,studentController.searchYear)
router.get("/cls/",authenticate,studentController.searchClass)

router.post("/add", upload.array("image", 2),authenticate, studentController.studentCreate);
router.post("/addmajor",authenticate, studentController.MajorAdd)

router.delete("/del/:std_id",authenticate,studentController.delData)
router.delete("/delmajor/:major_id", authenticate,studentController.Delmajor)

router.patch("/updatemajor/:major_id",studentController.UpdateMajor)
router.patch("/reject/:std_id",studentController.rejectStatus)
router.patch("/upstatus/:std_id", studentController.updateStatus)
router.patch("/update/:std_id",  studentController.updateData)
module.exports = router;
