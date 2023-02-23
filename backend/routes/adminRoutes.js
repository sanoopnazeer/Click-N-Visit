var express = require('express');
var router = express.Router();
const { adminSignin, adminSignup, allUsers, unblockUser, blockUser, allDoctors, blockDoctor, unblockDoctor, pendingApprovals, approve, addCategory, getCategories, deleteCategory, allAppointments } = require('../controllers/adminControllers')

router.post("/adminLogin", adminSignin);
router.post("/adminSignup", adminSignup);
router.get('/getUsers', allUsers)
router.get('/blockUser/:id', blockUser)
router.get('/unblockUser/:id', unblockUser)
router.get('/getDoctors', allDoctors)
router.get('/blockDoctor/:id', blockDoctor)
router.get('/unblockDoctor/:id', unblockDoctor)
router.get('/pendingApprovals', pendingApprovals)
router.get('/approve/:id', approve)
router.post('/addCategory', addCategory)
router.get('/getCategories', getCategories)
router.get('/deleteCategory/:id', deleteCategory)
router.get('/allAppointments', allAppointments)

module.exports = router;