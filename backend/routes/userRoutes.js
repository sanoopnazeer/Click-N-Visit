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
const { userProtect } = require("../middlewares/authMiddleware");

router.post("/signup", registerUser);
router.post("/signin", signin);

router.get('/getUserProfile/:id', getUserProfile)
router.post('/updateUserProfile/:id', userProtect, updateUserProfile)

// router.get("/:id/verify/:token", verifyToken)

// CHECK AVAILABILITY
router.post("/check-availability", checkAvailability);

// BOOK APPOINTMENT
// router.post('/book-appointment', bookAppointment)
router.post("/payment/:id", userProtect, payment);
router.post("/verifyPayment", userProtect, verifyPayment);

router.get("/view-appointments/:id", userProtect, getUserAppointments);

module.exports = router;
