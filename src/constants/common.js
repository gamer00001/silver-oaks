export const TeacherCoursesTabs = [
  {
    title: "Lectures",
    to: "./lectures",
  },
  {
    title: "Quizzes",
    to: "./quizzes",
  },
  {
    title: "Assignments",
    to: "./assignments",
  },
  {
    title: "Participants",
    to: "./participants",
  },
  {
    title: "Academic Record",
    to: "./academic-record",
  },
  {
    title: "Attendance",
    to: "./attendance",
  },
  {
    title: "Assesment",
    to: "./exam",
  },
];

export const StudentCoursesTabs = [
  {
    title: "Lectures",
    to: "./lectures",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Quizzes",
    to: "./quizzes",
    baseRoute: "enrolled-courses",
  },
  {
    title: "OGA",
    to: "./on-going-assignment",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Assignments",
    to: "./assignments",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Grades",
    to: "./graded",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Assesment",
    to: "./exam",
    baseRoute: "enrolled-courses",
  },
];
