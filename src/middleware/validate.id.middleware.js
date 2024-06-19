import mongoose from "mongoose";

const validateIsFormReqParams = (req, res, next) => {
  //extract id from req.params
  const id = req.params.id;

  //check mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(id);
  // console.log(isValidMongoId);

  //if not valid mongo id ,throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }
  //call next function
  next();
};
export default validateIsFormReqParams;
