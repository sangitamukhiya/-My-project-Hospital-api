import * as Yup from "yup";

export const addApointmentValidatoinSchema = Yup.object({
  firstName: Yup.string()
    .required("FirstName is required.")
    .trim()
    .max(30, "Name must be at max 30 characters."),

  lastName: Yup.string()
    .required("LastName is required.")
    .trim()
    .max(30, "Name must be at max 30 characters."),

  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required.")
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),
  phoneNumber: Yup.string()
    .required("Phone Number is required.")
    .trim()
    .min(7, "Contact number must be at least 7 characters.")
    .max(15, "Contact number must be at most 15 characters."),

  gender: Yup.string()
    .required("Gender is required.")
    .trim()
    .oneOf(["male", "female", "preferNotToSay"]),

  apointment_date: Yup.string().required("Apointment is required.").trim(),

  department: Yup.string()
    .required("Department is required.")
    .trim()
    .oneOf([
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
    ]),

  "doctor.firstName": Yup.string()
    .required("Doctor first name is required.")
    .trim()
    .max(30, "Doctor first name must be at most 30 characters."),

  "doctor.lastName": Yup.string()
    .required("Doctor last name is required.")
    .trim()
    .max(30, "Doctor last name must be at most 30 characters."),

  hasVisited: Yup.boolean(),
  doctorId: Yup.string()

    .required("Doctor id is required")
    .trim(),
  address: Yup.string().trim().required("Address is required."),
  status: Yup.string().trim().oneOf(["Pending", "Accepted", "Rejected"]),
});
