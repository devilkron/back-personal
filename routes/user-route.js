const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authenticate = require("../middlewares/authenticate")

router.get("/show",authenticate, userController.showSTDbyUser );
router.get("/detail/:std_id",userController.showDtById)
router.post("/add", userController.register);
router.get("/dashboard", userController.dashGet)
router.get("/gender", userController.getGender)
module.exports = router;
