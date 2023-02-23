var express = require("express");
var router = express.Router();
const {
  registerUser,
  signin,
  verifyToken,
  bookAppointment,
  checkAvailability,
  getUserAppointments,
  payment,
  verifyPayment,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");

router.post("/signup", registerUser);
router.post("/signin", signin);

router.get('/getUserProfile/:id', getUserProfile)
router.post('/updateUserProfile/:id', updateUserProfile)

// router.get("/:id/verify/:token", verifyToken)

// BOOK APPOINTMENT
// router.post('/book-appointment', bookAppointment)
router.post("/payment/:id", payment);
router.post("/verifyPayment", verifyPayment);

// CHECK AVAILABILITY
router.post("/check-availability", checkAvailability);

router.get("/view-appointments/:id", getUserAppointments);

module.exports = router;
