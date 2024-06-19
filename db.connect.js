import mongoose from "mongoose";

const dbuserName = process.env.DB_USER_NAME;
const dbpassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
//encodeURLComponent=>special character understand garna ko lagi
const dbURL = `mongodb+srv://${dbuserName}:${dbpassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connection established....");
  } catch (error) {
    console.log(error.message);
    console.log("DB connecion failed......");
  }
};
export default connectDB;
