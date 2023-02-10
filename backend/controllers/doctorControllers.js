const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const Category = require("../models/CategoryModel");

const doctorSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctorExists = await Doctor.findOne({ email });
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor doesn't exist" });
    }

    if (doctorExists.isBlocked) {
      return res.status(404).json({ message: "BLOCKED by the admin" });
    }

    if (!doctorExists.isApproved) {
      return res.status(404).json({ message: "Approval Pending" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      doctorExists.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: doctorExists.email, id: doctorExists._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );
    return res.status(200).json({ doctorExists, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const doctorSignup = asyncHandler(async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      specialization,
      email,
      password,
      experience,
      feesPerConsultation,
      timings,
    } = req.body;
    let doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(404).json({ message: "Doctor already exists" });
    }

    const doctor = await Doctor.create({
      firstname,
      lastname,
      specialization,
      email,
      password,
      experience,
      feesPerConsultation,
      timings,
    });

    const token = jwt.sign(
      { email: doctor.email, id: doctor._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.status(201).json({ doctor, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

const getDoctorByCategory = async (req, res) => {
  try {
    const catId = mongoose.Types.ObjectId(req.params.id);
    const doctors = await Doctor.find({ specialization: catId }).populate(
      "specialization"
    );
    // console.log(doctors);
    res.json({ doctorDetails: doctors, status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    console.log("staart of get profile");
    const docId = mongoose.Types.ObjectId(req.params.id);
    const doctor = await Doctor.findOne({ _id: docId }).populate(
      "specialization"
    );
    res.json({ doctorProfile: doctor, status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    console.log(req.body.formData);
    console.log("inside backend update");
    const docId = mongoose.Types.ObjectId(req.params.id);
    const updated = await Doctor.findOneAndUpdate(
      { _id: docId },
      req.body.formData
    );
    console.log(updated);
    res.json({ updatedDoc: updated, status: "ok", message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  doctorSignin,
  doctorSignup,
  getDoctorByCategory,
  getDoctorProfile,
  updateDoctorProfile,
};
