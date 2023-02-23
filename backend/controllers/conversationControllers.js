const Conversation = require("../models/conversationModel")

const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getConversation = async (req, res) => {
    try {
        const userId = req.params.userId
        const conversation = await Conversation.find({ members: { $in: userId}})
        res.status(200).json({conversation: conversation, status: "ok"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {newConversation,getConversation}