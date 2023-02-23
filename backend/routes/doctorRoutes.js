var express = require('express');
var router = express.Router();
const { doctorSignin, doctorSignup, getDoctorByCategory, getDoctorProfile, updateDoctorProfile, getSingleDoctor, getAppointmentRequests, updateAppointmentStatus, getDoctorDetails } = require('../controllers/doctorControllers')

router.post("/doctorLogin", doctorSignin);
router.post("/doctorSignup", doctorSignup);
router.get("/getDoctorByCategory/:id", getDoctorByCategory);
router.get("/getDoctorProfile/:id", getDoctorProfile)
router.post("/updateDoctorProfile/:id", updateDoctorProfile)
router.get("/getSingleDoctor/:id", getSingleDoctor)
router.post("/update-appointment-status", updateAppointmentStatus)
router.get("/getDoctorDetails/:id", getDoctorDetails)
router.get("/getAppointmentRequests/:id", getAppointmentRequests)

module.exports = router;