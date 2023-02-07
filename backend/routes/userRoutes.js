var express = require('express');
var router = express.Router();
const { registerUser, signin, verifyToken } = require('../controllers/userControllers')

router.post("/signup", registerUser);

router.post("/signin", signin);

// router.get("/:id/verify/:token", verifyToken)

module.exports = router;