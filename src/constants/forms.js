import { MOCK_GRADES } from "@/modules/admin/AllClasses";

export const AddStudentFields = (campusOptions, isEditMode = false) => {
  return [
    {
      name: "studentName",
      placeholder: "Name",
      column: 6,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "campusName",
      placeholder: "Campus",
      options: campusOptions ?? [],
      column: 6,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },
    {
      name: "grade",
      placeholder: "Grade",
      column: 6,
      options: MOCK_GRADES().map((item) => item.title),
      icon: "/icon-2.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "section",
      placeholder: "Section",
      column: 6,
      icon: "/icon-4.svg",
      options: [],
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "rollNumber",
      placeholder: "Roll No",
      column: 6,
      icon: "/icon-3.svg",
      type: "text",
      isDisabled: isEditMode,
      showLabel: true,
    },
    {
      name: "gender",
      placeholder: "Gender",
      options: ["Male", "Female"],
      column: 6,
      icon: "/icon-6.svg",
      type: "dropdown",
      showLabel: true,
    },
    {
      name: "password",
      placeholder: "Password",
      column: 6,
      icon: "/icon-7.svg",
      type: "password",
      showLabel: true,
    },
    {
      name: "dateOfBirth",
      placeholder: "Date of Birth",
      showPreviousDates: true,
      column: 6,
      icon: "/icon-8.svg",
      type: "date",
      showLabel: true,
    },

    {
      name: "guardianName",
      placeholder: "Guardian",
      column: 6,
      icon: "/icon-6.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "city",
      placeholder: "City",
      column: 6,
      icon: "/icon-9.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "guardianEmail",
      placeholder: "Guardian Email",
      column: 6,
      icon: "/icon-11.svg",
      type: "email",
      showLabel: true,
    },

    {
      name: "guardianPhoneNumber",
      placeholder: "Contact Number",
      column: 6,
      icon: "/icon-11.svg",
      type: "text",
      showLabel: true,
    },

    {
      name: "address",
      placeholder: "Address",
      column: 12,
      icon: "/icon-12.svg",
      type: "text",
      showLabel: true,
    },
  ];
};

export const AddTeacherFields = (campuses = []) => {
  return [
    {
      name: "employeeName",
      placeholder: "Employee Name",
      column: 6,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "campusName",
      placeholder: "Campus",
      options: campuses?.map((item) => item?.campusName),
      column: 6,
      icon: "/icon-5.svg",
      showLabel: true,
      type: "dropdown",
    },
    {
      name: "password",
      placeholder: "Password",
      column: 6,
      icon: "/icon-7.svg",
      showLabel: true,
      type: "password",
    },
    {
      name: "dateOfBirth",
      placeholder: "Date of Birth",
      column: 6,
      icon: "/icon-8.svg",
      type: "date",
      showPreviousDates: true,
      showLabel: true,
    },
    {
      name: "joiningDate",
      placeholder: "Joining Date",
      column: 6,
      icon: "/icon-6.svg",
      type: "date",
      showLabel: true,
    },

    {
      name: "gender",
      placeholder: "Gender",
      options: ["Male", "Female"],
      column: 6,
      icon: "/icon-6.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "phoneNumber",
      placeholder: "Contact Number",
      column: 6,
      icon: "/icon-11.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "email",
      placeholder: "Email",
      column: 6,
      icon: "/icon-11.svg",
      type: "email",
      showLabel: true,
    },
  ];
};

export const GradeSectionSelectionFields = () => {
  return [
    {
      name: "grade",
      placeholder: "Grade",
      column: 6,
      options: MOCK_GRADES().map((item) => item.title),
      icon: "/icon-2.svg",
      type: "dropdown",
      showLabel: true,
    },
    {
      name: "section",
      placeholder: "Section",
      column: 6,
      icon: "/icon-4.svg",
      options: [],
      type: "dropdown",
      showLabel: true,
    },
  ];
};

export const AddAnnouncementFields = () => {
  return [
    {
      name: "title",
      placeholder: "Enter Announcements",
      column: 12,
      // icon: "/icon-1.svg",
      type: "textarea",
    },
    {
      name: "visibleTo",
      placeholder: "Visible To",
      options: ["Student", "Teachers", "Both"],
      column: 4,
      // icon: "/icon-5.svg",
      type: "dropdown",
    },
    {
      name: "date",
      placeholder: "Select Date",
      column: 4,
      // icon: "/icon-8.svg",
      type: "date",
    },
    {
      name: "grade",
      placeholder: "Select Grade",
      options: ["Grade 1", "Grade 2", "Grade 3"],
      column: 4,
      // icon: "/icon-5.svg",
      type: "dropdown",
    },
    ,
  ];
};

export const AddNewAnnouncementFields = () => {
  return [
    {
      name: "title",
      placeholder: "Enter Announcement Title",
      column: 12,
      // icon: "/icon-1.svg",
      showLabel: true,
      type: "text",
    },
    {
      name: "description",
      placeholder: "Enter Description",
      column: 12,
      showLabel: true,
      // icon: "/icon-1.svg",
      type: "text",
    },
    {
      name: "eventDate",
      placeholder: "Select Date",
      column: 12,
      showLabel: true,
      // icon: "/icon-8.svg",
      type: "date",
    },
    {
      name: "time",
      placeholder: "Enter Time",
      column: 12,
      showLabel: true,
      // icon: "/icon-5.svg",
      type: "number",
    },
    {
      name: "type",
      placeholder: "Enter Event Type",
      column: 12,
      showLabel: true,
      // icon: "/icon-5.svg",
      type: "text",
    },
    ,
  ];
};

export const AddNotificationFields = () => {
  return [
    {
      name: "title",
      placeholder: "Enter Notification",
      column: 12,
      // icon: "/icon-1.svg",
      type: "textarea",
    },
    {
      name: "visibleTo",
      placeholder: "Visible To",
      options: ["Student", "Teachers", "Both"],
      column: 4,
      // icon: "/icon-5.svg",
      type: "dropdown",
    },
    {
      name: "date",
      placeholder: "Select Date",
      column: 4,
      // icon: "/icon-8.svg",
      type: "date",
    },
    {
      name: "grade",
      placeholder: "Select Grade",
      options: ["Grade 1", "Grade 2", "Grade 3"],
      column: 4,
      // icon: "/icon-5.svg",
      type: "dropdown",
    },
    ,
  ];
};

export const AddGradeFields = () => {
  return [
    {
      name: "title",
      placeholder: "Enter Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
    },
    {
      name: "campus",
      placeholder: "Select Campus",
      options: ["Campus 1", "Campus 2", "Campus 3"],
      column: 12,
      icon: "/icon-5.svg",
      type: "dropdown",
    },
  ];
};

export const AddCourseFields = () => {
  return [
    {
      name: "name",
      placeholder: "Course Name",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "description",
      placeholder: "Course Description",
      column: 12,
      icon: "/icon-5.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "credits",
      placeholder: "Credit",
      column: 12,
      icon: "/icon-1.svg",
      type: "number",
      showLabel: true,
    },
  ];
};

export const AddCampusFields = () => {
  return [
    {
      name: "name",
      placeholder: "Enter Campus Name",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    // {
    //   name: "campusLocation",
    //   placeholder: "Enter Campus Location",
    //   column: 12,
    //   icon: "/icon-5.svg",
    //   type: "dropdown",
    // },
  ];
};

export const AddSectionFields = (campusesOptions = []) => {
  return [
    {
      name: "name",
      placeholder: "Enter Section Name",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "grade",
      placeholder: "Select Grade",
      options: MOCK_GRADES().map((item) => item.title),
      column: 12,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },
    {
      name: "campus",
      placeholder: "Select Campus",
      column: 12,
      icon: "/icon-1.svg",
      type: "dropdown",
      options: campusesOptions,
      showLabel: true,
    },
  ];
};

export const AddLectureFields = () => {
  return [
    {
      name: "lectureTitle",
      placeholder: "Enter Lecture Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "description",
      placeholder: "Enter Description",
      column: 12,
      icon: "/icon-5.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "videoUrl",
      placeholder: "Enter Video URL",
      column: 12,
      icon: "/icon-5.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "file",
      placeholder: "Select File",
      column: 12,
      acceptedFiles: "/pdf",
      icon: "/icon-1.svg",
      type: "file",
      showLabel: true,
    },
  ];
};

export const AddAssignmentFields = () => {
  return [
    {
      name: "assignmentTitle",
      placeholder: "Enter Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "description",
      placeholder: "Enter Description",
      column: 12,
      icon: "/icon-5.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "term",
      placeholder: "Select Term",
      options: ["Term 1", "Term 2", "Term 3"],
      column: 12,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "teacher",
      placeholder: "Select Teacher",
      options: [],
      column: 12,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "totalMarks",
      placeholder: "Enter Marks",
      column: 12,
      icon: "/icon-5.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "dueDate",
      placeholder: "Enter Due Date",
      column: 12,
      icon: "/icon-5.svg",
      showNextDates: true,
      type: "date",
      showLabel: true,
    },
    {
      name: "file",
      placeholder: "Select File",
      column: 12,
      acceptedFiles: "/pdf",
      icon: "/icon-1.svg",
      type: "file",
      showLabel: true,
    },
  ];
};

export const AddQuizFields = () => {
  return [
    {
      name: "quizTitle",
      placeholder: "Quiz Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "time",
      placeholder: "Quiz Time",
      column: 6,
      icon: "/icon-1.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "totalMarks",
      placeholder: "Total Marks",
      column: 6,
      icon: "/icon-5.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "term",
      placeholder: "Select Term",
      options: ["Term 1", "Term 2", "Term 3"],
      column: 6,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "dueDate",
      placeholder: "Due Date",
      column: 6,
      icon: "/icon-5.svg",
      showNextDates: true,
      type: "date",
      showLabel: true,
    },
  ];
};

export const AddExamFields = () => {
  return [
    {
      name: "examTitle",
      placeholder: "Exam Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "time",
      placeholder: "Exam Time",
      column: 6,
      icon: "/icon-1.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "totalMarks",
      placeholder: "Total Marks",
      column: 6,
      icon: "/icon-5.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "term",
      placeholder: "Select Term",
      options: ["Term 1", "Term 2", "Term 3"],
      column: 6,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "dueDate",
      placeholder: "Due Date",
      column: 6,
      icon: "/icon-5.svg",
      showNextDates: true,
      type: "date",
      showLabel: true,
    },
  ];
};

export const AddOGAFields = () => {
  return [
    {
      name: "ogaTitle",
      placeholder: "OGA Title",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
      showLabel: true,
    },
    {
      name: "time",
      placeholder: "Time",
      column: 6,
      icon: "/icon-1.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "totalMarks",
      placeholder: "Total Marks",
      column: 6,
      icon: "/icon-5.svg",
      type: "number",
      showLabel: true,
    },
    {
      name: "term",
      placeholder: "Select Term",
      options: ["Term 1", "Term 2", "Term 3"],
      column: 6,
      icon: "/icon-5.svg",
      type: "dropdown",
      showLabel: true,
    },

    {
      name: "dueDate",
      placeholder: "Due Date",
      column: 6,
      icon: "/icon-5.svg",
      showNextDates: true,
      type: "date",
      showLabel: true,
    },
  ];
};
