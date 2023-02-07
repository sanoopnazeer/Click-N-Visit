var express = require('express');
var router = express.Router();
const { doctorSignin, doctorSignup, getDoctorByCategory } = require('../controllers/doctorControllers')

router.post("/doctorLogin", doctorSignin);
router.post("/doctorSignup", doctorSignup);
router.get("/getDoctorByCategory/:id", getDoctorByCategory);

module.exports = router;