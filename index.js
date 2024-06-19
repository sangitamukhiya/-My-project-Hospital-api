import express from "express";
import connectDB from "./db.connect.js";
import userRoutes from "./src/user/user.router.js";
import doctorRouters from "./src/doctor/doctor.router.js";
import apointmentRouters from "./src/apointment/apointment.router.js";
import cors from "cors";
const app = express();

//to make app understand
app.use(express.json());

//enable cors()
//cross origin resource sharing
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//database connection
connectDB();

//register router
app.use(userRoutes);
app.use(doctorRouters);
app.use(apointmentRouters);

//network port and server

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
