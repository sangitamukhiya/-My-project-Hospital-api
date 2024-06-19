import mongoose from "mongoose";
import { date, string } from "yup";

//set rules

const doctorSchema = new mongoose.Schema(
  {
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
    address: {
      type: String,
      required: false,
      trim: true,
      maxlength: 30,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "preferNotToSay"],
    },
    // dob: {
    //   type: Date,
    //   required: false,
    //   default: Date.now,
    // },
    experience: {
      type: String,
      required: true,
      trim: true,
      min: 1, //year
    },
    doctorDepartment: {
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
    adminId: {
      type: mongoose.ObjectId,
      required: true,
      ref: "users",
    },
    image: {
      type: String,
      default: null,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

//create collection
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
