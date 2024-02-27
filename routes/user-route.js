const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/", (req, res, next) => {
    res.json('Hello')
});
router.put("/", () => {});

router.post("/add", userController.register);
router.get("/add", (req,res,next)=> {
    res.json({msg: "rrrrr"})
});

module.exports = router;
