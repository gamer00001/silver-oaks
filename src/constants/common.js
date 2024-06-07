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
    title: "OGA",
    to: "./oga",
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
    to: "./on-going-assesments",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Assignments",
    to: "./assignments",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Grades",
    to: "./grades",
    baseRoute: "enrolled-courses",
  },
  {
    title: "Exams",
    to: "./exam",
    baseRoute: "enrolled-courses",
  },
];

export const AdminCoursesTabs = [
  {
    title: "Lectures",
    to: "./lectures",
    baseRoute: "lectures",
  },
  {
    title: "Assignments",
    to: "./assignments",
    baseRoute: "assignments",
  },
  {
    title: "Quizzes",
    to: "./quizzes",
    baseRoute: "quizzes",
  },
  {
    title: "Exams",
    to: "./exams",
    baseRoute: "exams",
  },

  {
    title: "OGA",
    to: "./oga",
    baseRoute: "oga",
  },

  {
    title: "Students",
    to: "./students",
    baseRoute: "students",
  },
  {
    title: "Reports",
    to: "./reports",
    baseRoute: "reports",
  },
];
