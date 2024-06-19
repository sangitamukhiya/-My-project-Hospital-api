import express from "express";
import {
  isAdmin,
  isPatient,
  isUser,
} from "../middleware/authentication.middleware.js";
import validateReqBody from "../middleware/validation.middleware.js";
import { addApointmentValidatoinSchema } from "./apointment.validation.js";
import Apointment from "./apointment.model.js";
import validateIsFormReqParams from "../middleware/validate.id.middleware.js";

const router = express.Router();

router.post(
  "/apointment/add",
  isPatient,
  validateReqBody(addApointmentValidatoinSchema),
  async (req, res) => {
    //extract new apointment from req.bady
    const newPatientApointment = req.body;

    //extract loggedInuserId
    const loggedInUserId = req.loggedInUserId;
    newPatientApointment.patientId = loggedInUserId;

    //create apointment
    await Apointment.create(newPatientApointment);
    return res
      .status(200)
      .send({ message: "Apointment is successfully submited." });
  }
);

//get apointment details
router.get(
  "/apointment/details/:id",
  isUser,
  validateIsFormReqParams,
  async (req, res) => {
    //extract doctor id from params

    const apointmentId = req.params.id;

    //find apointment
    const apointment = await Apointment.find({ _id: apointmentId });

    //if not apointment ,throw error
    if (!apointment) {
      return res.status(404).send({ message: "No any apointment." });
    }

    //send response
    return res
      .status(200)
      .send({ message: "success", apointmentDetails: apointment });
  }
);

//update apointment status
router.put(
  "/apointmentStatus/edit/:id",
  isAdmin,
  validateIsFormReqParams,
  async (req, res) => {
    //extract apointment id from req.params
    const apointmentId = req.params.id;

    //find product by id
    const apointment = await Apointment.findById(apointmentId);

    //if not Apointment, throw error

    if (!apointment) {
      return res.status(404).send({ message: "Apointment not found !" });
    }
    //extract newValues from req.body
    const newValues = req.body;

    // console.log(newValues);

    //edit Apointment status
    await Apointment.updateOne(
      { _id: apointmentId },
      {
        $set: {
          ...newValues,
        },
      }
    );
    //send response
    return res.status(200).send({
      message: "Apointment status is updated successfully.",
      apointmentDetails: apointment,
    });
  }
);

//delete apointment
router.delete(
  "/apointment/delete/:id",
  isAdmin,
  validateIsFormReqParams,
  async (req, res) => {
    //extract apointment id from req.params
    const apointmentId = req.params.id;

    //find apointment
    const apointment = await Apointment.findById(apointmentId);

    //if not find,throw error
    if (!apointment) {
      return res.status(404).send({ message: "Apointment not found." });
    }

    //delete apointment
    await Apointment.deleteOne({ _id: apointmentId });

    //send response
    return res
      .status(200)
      .send({ message: "Apointment is deleted successfully." });
  }
);

export default router;
