import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
//role must be admin
export const isAdmin = async (req, res, next) => {
  //extract authorization from req.headers
  const authorization = req?.headers?.authorization;
  // console.log(authorization);
  // console.log(req.header);

  //extract token from authorizations
  const splittedValues = authorization?.split(" ");
  // console.log(splittedValues);
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;
  // console.log(token);

  //if not token  throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  let payload;
  try {
    //verify token
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SIGNATURE);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(payload);

  //find  user by email from payload

  const user = await User.findOne({ email: payload.email });

  //if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(user);

  //user role most be admin
  if (user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized." });
  }
  //Add Admin id to req
  req.loggedInUserId = user._id;
  //call next function
  next();
};

//role must be patient
export const isPatient = async (req, res, next) => {
  //extract authorization from req.headers
  const authorization = req?.headers?.authorization;
  // console.log(authorization);
  // console.log(req.header);

  //extract token from authorizations
  const splittedValues = authorization?.split(" ");
  // console.log(splittedValues);
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;
  // console.log(token);

  //if not token  throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  let payload;
  try {
    //verify token
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SIGNATURE);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(payload);

  //find  user by email from payload

  const user = await User.findOne({ email: payload.email });

  //if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(user);

  //user role most be admin
  if (user.role !== "patient") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  //add Patient id to req

  req.loggedInUserId = user._id;
  //call next function
  next();
};

//?if role not admin nor patient
export const isUser = async (req, res, next) => {
  //extract authorization from req.headers
  const authorization = req?.headers?.authorization;
  // console.log(authorization);
  // console.log(req.header);

  //extract token from authorizations
  const splittedValues = authorization?.split(" ");
  // console.log(splittedValues);
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;
  // console.log(token);

  //if not token  throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  let payload;
  try {
    //verify token
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SIGNATURE);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(payload);

  //find  user by email from payload

  const user = await User.findOne({ email: payload.email });

  //if not user
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  // console.log(user);

  //add logged in user id to req
  req.loggedInUserId = user._id;

  //call next function
  next();
};
