import { extractTextFromHTML } from "@/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const SearchSchema = Yup.object().shape({
  query: Yup.string().required(""),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(6, "Password atleast consists of 6 characters")
    .required("Password is required"),
});

export const ForgetSchema = Yup.object().shape({
  email: Yup.string().email("Email must a valid").required("Email is required"),
});

export const ResetPassSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must include at least one special symbol (!@#$%^&*(),.?":{}|<>)'
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const changePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .matches(/[a-z]/, "New Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "New Password must include at least one uppercase letter")
    .matches(/\d/, "New Password must include at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'New Password must include at least one special symbol (!@#$%^&*(),.?":{}|<>)'
    )
    .min(8, "New Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email("Email must a valid").required("Email is required"),
  username: Yup.string().required("User name is required"),
  name: Yup.string().required("Name is required"),
  about: Yup.string().required("About is required"),
  image: Yup.mixed().required("Image is required"),
  phone: Yup.string()
    .test("custom", "Enter a valid number", (value) =>
      isValidPhoneNumber(value)
    )
    .required("Phone is required"),
});

export const AddEventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  eventDate: Yup.mixed().required("Date is required"),
  type: Yup.string().required("Event type is required"),
  courseId: Yup.string().required("Course is required"),
  description: Yup.string().required("Description is required"),
});

export const AddAssignmentSchema = Yup.object().shape({
  assignmentTitle: Yup.string().required("Title is required"),
  dueDate: Yup.mixed().required("Due Date is required"),
  file: Yup.string().required("Assignment is required"),
  courseId: Yup.string().required("Course is required"),
  description: Yup.string().required("Description is required"),
  totalMarks: Yup.mixed().required("Total Marks are required"),
});

export const MarkAssignment = Yup.object().shape({
  name: Yup.string().required("Student Name is required"),
  marks: Yup.string().required("Marks are required"),
  feedback: Yup.string().required("feedback is required"),
});

export const searchSchema = Yup.object().shape({
  query: Yup.mixed().required("Query is required"),
});

export const AddAnnouncementSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  visibleTo: Yup.string().required("Visibe To is required"),
  date: Yup.string().required("Date is required"),
  grade: Yup.string().required("Grade is required"),
});

export const AddCourseSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description To is required"),
  credits: Yup.number().required("Credits is required"),
});

export const AddCampusSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const AddSectionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  campus: Yup.string().required("Campus is required"),
});

export const AddStudentSchema = Yup.object().shape({
  studentName: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  campusName: Yup.string().required("Campus is required"),
  rollNumber: Yup.string().required("Roll Number is required"),
  section: Yup.string().required("Section is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().required("Password is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  guardianName: Yup.string().required("Guardian Name is required"),
  city: Yup.string().required("City is required"),
  guardianEmail: Yup.string().required("Guardian Email is required"),
  guardianPhoneNumber: Yup.string().required(
    "Guardian Phone Number is required"
  ),
  address: Yup.string().required("Address is required"),
});

export const AddTeacherSchema = Yup.object().shape({
  employeeName: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  campusName: Yup.string().required("Campus is required"),
  campusName: Yup.string().required("Campus is required"),
  section: Yup.string().required("Section is required"),
  gender: Yup.string().required("Gender is required"),
  password: Yup.string().required("Password is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  joiningDate: Yup.string().required("Joining Date is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("Email is required"),
});
