const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/tokenSender");
const crypto = require("crypto");
const Razorpay = require('razorpay')
const Appointments = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel")
const moment = require("moment");
const moment_timezone = require('moment-timezone')
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose");

// const secret = 'test'

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (userExists.isBlocked) {
      return res
        .status(404)
        .json({ message: "You have been BLOCKED by the admin" });
    }

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    return res.status(200).json({ userExists, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, gender, age, email, password } = req.body;
    let userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(404).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstname,
      lastname,
      gender,
      age,
      email,
      password,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );
    // const token = await new Token({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex")
    // }).save();
    // const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
    // await sendEmail(user.email, "Verify Email", url)

    res.status(201).json({
      user,
      token,
      message: "An Email has been sent to your account. Please verify",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

const getUserProfile = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const user = await User.findOne({ _id: userId })
    res.json({ userProfile: user, status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const updateUserProfile = async (req, res) => {
  console.log(req.body.formValue);
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const updated = await User.findOneAndUpdate(
      { _id: userId },
      req.body.formData
    );
    res.json({ updatedDoc: updated, status: "ok", message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

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

// BOOK APPOINTMENT

// const bookAppointment = async (req, res) => {
//   try {
//     req.body.appointmentData.date = moment(
//       req.body.appointmentData.date,
//       "DD-MM-YYYY"
//     ).toISOString();
//     req.body.appointmentData.time = moment(
//       req.body.appointmentData.time,
//       "h:mm a"
//     ).toISOString();
//     console.log(req.body.appointmentData);
//     console.log("above is backend controller appoitmaent data");
//     req.body.status = "pending";
//     const newAppointment = new Appointments(req.body.appointmentData);
//     await newAppointment.save();
//     res.status(200).send({ status: "ok", message: "Appointment booked" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

const payment = async (req, res) => {
  console.log('in payment backend');
  try {
      const userId = req.params.id
      const { docId, date, time } = req.body
      console.log(docId, date, time);

      const user = await User.findById({ _id: userId })
      const doctor = await Doctor.findById({ _id: docId })

      // const startDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").toISOString();
      // const momentEndDate = moment.tz(date + " 00:00:00", "DD-MM-YYYY HH:mm:ss", "UTC").add(29, "days");
      // const endDate = momentEndDate.toISOString();
      // console.log(startDate);
      // console.log(endDate);

      const booked = await Appointments.create({
          userId: user._id,
          doctorId: doctor._id,
          userInfo: `${user.firstname} ${user.lastname}`,
          doctorInfo: `${doctor.firstname} ${doctor.lastname}`,
          date: date,
          time: time,
          amount: doctor.feesPerConsultation
      })

      console.log(booked);
      console.log("above is booked data");
      const amount = doctor.feesPerConsultation;
      await generateRazorpay(booked._id, amount, res)

  } catch (err) {
      console.log(err);
  }
}

const generateRazorpay = async (id, amount, res) => {
  console.log('in generate rpay');
  try {
      console.log(id);
      console.log(amount);
      instance.orders.create(
          {
              amount: amount * 100,
              currency: 'INR',
              receipt: `${id}`,
              notes: {
                  key1: 'value3',
                  key2: 'value2',
              },
          }, (err, order) => {
              console.log(order);
              res.json({ status: true, order: order });
          })
  }
  catch (error) {
    console.log(error);
      res.json({
          status: "Failed",
          message: error.message
      })
  }
}

const verifyPayment = async (req, res) => {
  console.log('in verify payment');
  try {
      console.log(req.body);

      //creating hmac object
      let hmac = crypto.createHmac('sha256', process.env.key_secret);

      //Passing the data to be hashed
      hmac.update(req.body.res.razorpay_order_id + "|" + req.body.res.razorpay_payment_id);

      //creating the hmac in the required format
      const generated_signature = hmac.digest('hex');

      var response = { signatureIsValid: "false" }
      if (generated_signature === req.body.res.razorpay_signature) {
          response = { signatureIsValid: "true" }
          console.log("signatureIsvalid");

          changePaymentStatus(req.body.order, res)
          // res.json(response);
      } else {
          res.send(response);
      }

  } catch (err) {
      console.log(err);
  }
}

const changePaymentStatus = async (req, res) => {
  console.log('in change payment status');
  console.log(req);
  try {
      await Appointments.findOneAndUpdate({ _id: req.receipt }, {
          $set: {
              paymentStatus: 'Completed'
          }
      })
      console.log('status changed success');
      res.json({ status: true, message: 'Payment Successfull !' })
  }
  catch (error) {
      console.log('failed');
      res.json({ error: 'Payment Failed !' })
  }
}


// CHECK AVAILIBILITY
const checkAvailability = async (req, res) => {
  try {
    const date = moment(
      req.body.appointmentData.date,
      "DD-MM-YYYY"
    ).toISOString();
    const fromTime = moment(req.body.appointmentData.time, "h:mm a")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.appointmentData.time, "h:mm a")
      .add(1, "hours")
      .toISOString();
    const doctorId = req.body.appointmentData.docId;
    const appointments = await Appointments.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res
        .status(200)
        .send({ message: "Slot not available at this time", success: true });
    } else {
      return res.status(200).send({appointmentData:req.body.appointmentData, message: "Slot available", success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const user = req.params.id;
    const appointments = await Appointments.find({ userId: user});
    console.log(appointments);
    res.json({ appointmentsDetails: appointments, status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  signin,
  // bookAppointment,
  checkAvailability,
  getUserAppointments,
  payment,
  generateRazorpay,
  verifyPayment,
  changePaymentStatus,
  getUserProfile,
  updateUserProfile
};
