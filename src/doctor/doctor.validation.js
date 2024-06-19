import * as Yup from "yup";

export const addDoctorValidatoinSchema = Yup.object({
  firstName: Yup.string()
    .required("FirstName is required.")
    .trim()
    .max(30, "Name must be at max 30 characters."),

  lastName: Yup.string()
    .required("FirstName is required.")
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

  address: Yup.string()

    .trim()
    .max(30, "Address must be 30 characters."),

  gender: Yup.string()
    .required("Gender is required.")
    .trim()
    .oneOf(["male", "female", "preferNotToSay"]),
  // dob: Yup.date().min(1, "Date of birth must not be Zero"),

  experience: Yup.string()
    .required("Experience is required.")
    .trim()
    .min(1, "Experience must be at least 1 year."),
  doctorDepartment: Yup.string()
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
  image: Yup.string().nullable(),
});

export const paginationValidation = Yup.object({
  page: Yup.number()
    .min(1, "Page must be at least 1.")
    .required("Page is required."),
  limit: Yup.number()
    .min(1, "Limit must be at least 1.")
    .required("Limit is required.")
    .max(100, "Limit must be at max 100"),
});
