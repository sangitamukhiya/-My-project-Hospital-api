import express from "express";

import {
  isAdmin,
  isPatient,
  isUser,
} from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validation.middleware.js";
import {
  addDoctorValidatoinSchema,
  paginationValidation,
} from "./doctor.validation.js";
import Doctor from "./doctor.model.js";
import validateIsFormReqParams from "../middleware/validate.id.middleware.js";

const router = express.Router();

router.post(
  "/doctor/add",
  isAdmin,
  validateReqBody(addDoctorValidatoinSchema),
  async (req, res) => {
    //extract new doctroct from req.body
    const newDoctor = req.body;
    // console.log(req);

    //extract loggedUserId
    const loggedInUserId = req.loggedInUserId;
    newDoctor.adminId = loggedInUserId;

    //create product
    await Doctor.create(newDoctor);

    return res
      .status(200)
      .send({ message: "Doctor is register successfully." });
  }
);

//to get dotor details
router.get(
  "/doctor/details/:id",
  isUser,
  validateIsFormReqParams,
  async (req, res) => {
    //extract doctor id from params

    const doctorId = req.params.id;

    //find doctor
    const doctor = await Doctor.findOne({ _id: doctorId });

    //if not doctor ,throw error
    if (!doctor) {
      return res.status(404).send({ message: "Doctor does not exist." });
    }

    //send res
    return res.status(200).send({ message: "success", doctorDetails: doctor });
  }
);

//to detlete
router.delete(
  "/doctor/delete/:id",
  isAdmin,
  validateIsFormReqParams,
  async (req, res) => {
    //extract doctor id from req.params
    const doctorId = req.params.id;

    //find doctor
    const doctor = await Doctor.findOne({ _id: doctorId });

    //if not doctor ,throw error
    if (!doctor) {
      return res.status(404).send({ message: "Doctor does not exist." });
    }

    // console.log(doctor);
    //check doctor ownerShip

    //to be doctor owner:doctor adminId must be equal to logged in user id
    // const adminId = doctor.adminId;

    // const loggedInUserId = req.loggedInUserId;
    // console.log(adminId, loggedInUserId);
    // const isDoctorAdmin = adminId.equals(loggedInUserId);
    //alternative

    // const isDoctorAdmin = String(adminId) === String(loggedInUserId);
    // console.log(isDoctorAdmin);

    //if not doctor owner,throw error
    // if (!isDoctorAdmin) {
    //   return res.status(403).send({ message: "You are not admin . " });
    // }

    //delete doctor
    await Doctor.deleteOne({ _id: doctorId });

    //send response
    return res
      .status(200)
      .send({ message: "Doctor info is removed successfully." });
  }
);

router.put(
  "/doctor/edit/:id",
  isAdmin,
  validateIsFormReqParams,
  validateReqBody(addDoctorValidatoinSchema),
  async (req, res) => {
    //extract doctor id from req.params
    const doctorId = req.params.id;

    //find doctor by id
    const doctor = await Doctor.findOne({ _id: doctorId });
    // console.log(doctor);

    //if no doctor ,throw error
    if (!doctor) {
      return res.status(404).send({ message: "Doctor does not exist." });
    }

    //check for doctor wonerShip
    // const doctorAdminId = doctor.adminId;
    // const loggedInUserId = req.loggedInUserId;
    // const isDoctorAdmin = doctorAdminId.equals(loggedInUserId);
    // console.log(isDoctorAdmin);

    // if not admin of doctor ,throw error
    // if (!isDoctorAdmin) {
    //   return res.status(403).send({ message: "You are not admin." });
    // }
    //extrat newValues from req.body
    const newValues = req.body;
    // console.log(newValues);

    //edit  doctor info

    await Doctor.updateOne(
      { _id: doctorId },
      {
        $set: {
          ...newValues,
        },
      }
    );
    //send response
    return res
      .status(200)
      .send({ message: "Doctor info is updated successfuly." });
  }
);
//list doctor by patient
router.post(
  "/doctor/list/patient",
  isPatient,
  validateReqBody(paginationValidation),
  async (req, res) => {
    //extract pagination data from req.body
    const { page, limit } = req.body;

    const skip = (page - 1) * limit;

    const doctors = await Doctor.aggregate([
      {
        $match: {},
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
          address: 1,
          gender: 1,
          experience: 1,
          doctorDepartment: 1,

          image: 1,
        },
      },
    ]);

    return res.status(200).send({ message: "success", doctorList: doctors });
  }
);

//list doctor by admin

router.post(
  "/doctor/list/admin",
  isAdmin,
  validateReqBody(paginationValidation),

  async (req, res) => {
    //extract pagination data from req.body
    const { page, limit } = req.body;

    const skip = (page - 1) * limit;

    const doctors = await Doctor.aggregate([
      {
        $match: {},
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          adminId: 0,

          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    return res.status(200).send({ message: "success", doctorList: doctors });
  }
);

export default router;
