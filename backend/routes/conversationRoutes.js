const router = require('express').Router();
const { newConversation, getConversation } = require('../controllers/conversationControllers');
const Conversation = require('../models/conversationModel')

//new conv
router.post('/newConvo', newConversation)

//get conv of a user
router.get('/getConvo/:userId', getConversation)


module.exports = router