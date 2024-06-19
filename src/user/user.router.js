import { Router } from "express";
import validateReqBody from "../middleware/validation.middleware.js";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/user/register",
  validateReqBody(registerUserValidationSchema),
  async (req, res, next) => {
    //extract new user from req.body
    const newUser = req.body;

    //?check if user with provided already exist in our system
    //find user by email

    const user = await User.findOne({ email: newUser.email });
    // console.log(newUser);

    //if user,throw error
    if (user) {
      return res.status(409).send({ message: "Email already exist." });
    }
    //just before saving user , we need to create has password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    // console.log(hashedPassword);

    // update  new user password with has password
    newUser.password = hashedPassword;

    //save user
    await User.create(newUser);
    //send response
    return res.status(201).send({ message: "User is register successfully." });
    //
  }
);

//Login user
router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    //extract login credentials from req.body
    const loginCredentials = req.body;
    //find user by using email from login credentials
    const user = await User.findOne({ email: loginCredentials.email });
    // console.log(user);

    //if user not found ,throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials." });
    }

    //check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // console.log(isPasswordMatch);

    //if not password match ,throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials." });
    }
    // console.log(isPasswordMatch);

    //generate access token
    const payload = { email: user.email };
    // console.log(payload);

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SIGNATURE);
    // console.log(token);
    //to hide password
    user.password = undefined;
    //send response
    return res
      .status(200)
      .send({ message: "success", userDetails: user, accessToken: token });
  }
);

export default router;
