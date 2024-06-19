import mongoose from "mongoose";

//SET rule
const apointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
    unique: true,
    lowerCase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
    minLength: 7,
  },

  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female", "preferNotToSay"],
  },

  apointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Orthopedics",
      "Gynecology",
      "Dermatology",
      "Pediatrics",
      "Radiology",
      "Hematology",
      "Neurology",
      "Oncology",
      "Gastroenterology",
      "Cardiology",
      "Urology",
      "Ear,nose and throat",
      "Radiotherapy",
    ],
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  hasVisited: {
    type: Boolean,
    required: true,
  },
  doctorId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "doctors",
  },
  patientId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "users",
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,

    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

//create collection
const Apointment = mongoose.model("Apointment", apointmentSchema);

export default Apointment;
