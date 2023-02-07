const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Token = require('../models/tokenModel')
const sendEmail = require('../utils/tokenSender')
const crypto = require('crypto')

// const secret = 'test'


const signin = async (req, res) => {
    const { email, password } = req.body
    try{
        const userExists = await User.findOne({ email })
        if(!userExists){
            return res.status(404).json({ message: "User doesn't exist"})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if(!isPasswordCorrect){
           return res.status(404).json({message: "Invalid credentials"})
        }

        if(userExists.isBlocked){
            return res.status(404).json({ message: "You have been BLOCKED by the admin" })
        }
        
        const token = jwt.sign({ email: userExists.email, id: userExists._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1hr"})
        
        return res.status(200).json({ userExists, token })
    }catch(error){
        res.status(500).json({message: "Something went wrong"})
        console.log(error);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    
    try{
        const { firstname, lastname, email, password } = req.body
    let userExists = await User.findOne({ email })

    if(userExists){
        return res.status(404).json({ message: "User already exists"})
    }

    const user = await User.create({
        firstname, lastname, email, password
    })

    const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1hr"});
    // const token = await new Token({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex")
    // }).save();
    // const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
    // await sendEmail(user.email, "Verify Email", url)

    res.status(201).json({user, token, message: "An Email has been sent to your account. Please verify"})
    }catch(error){
        res.status(500).json({message: "Something went wrong"})
        console.log(error);
    }
})

// const verifyToken = async(req, res) => {
//     try{
//         const user = await User.findOne({_id: req.params.id})
//         if(!user) return res.status(400).send({message: "Invalid Link"})

//         const token = await Token.findOne({
//             userId: user._id,
//             token: req.params.token
//         })
//         if(!token) return res.status(400).send({message: "Invalid Link"})

//         await User.updateOne({_id: user._id, verified: true})
//         await token.remove()

//         res.status(200).send({message: "Email verified successfully"})
//     }catch{
//         res.status(500).json({message: "Something went wrong"})
//     }
// }

module.exports = { registerUser, signin }