var express = require('express');
var router = express.Router();
const { doctorSignin, doctorSignup, getDoctorByCategory, getDoctorProfile, updateDoctorProfile } = require('../controllers/doctorControllers')

router.post("/doctorLogin", doctorSignin);
router.post("/doctorSignup", doctorSignup);
router.get("/getDoctorByCategory/:id", getDoctorByCategory);
router.get("/getDoctorProfile/:id", getDoctorProfile)
router.post("/updateDoctorProfile/:id", updateDoctorProfile)

module.exports = router;