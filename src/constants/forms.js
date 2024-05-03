export const AddStudentFields = () => {
  return [
    {
      name: "name",
      placeholder: "Name",
      column: 6,
      icon: "/icon-1.svg",
      type: "text",
    },
    {
      name: "grade",
      placeholder: "Grade",
      column: 6,
      options: [],
      icon: "/icon-2.svg",
      type: "dropdown",
    },
    {
      name: "rollNumber",
      placeholder: "Roll No",
      column: 6,
      icon: "/icon-3.svg",
      type: "text",
    },
    {
      name: "section",
      placeholder: "Section",
      column: 6,
      icon: "/icon-4.svg",
      options: [],
      type: "dropdown",
    },
    {
      name: "campus",
      placeholder: "Campus",
      options: [],
      column: 6,
      icon: "/icon-5.svg",
      type: "dropdown",
    },
    {
      name: "gender",
      placeholder: "Gender",
      options: ["Male", "Female"],
      column: 6,
      icon: "/icon-6.svg",
      type: "dropdown",
    },
    {
      name: "password",
      placeholder: "Password",
      column: 6,
      icon: "/icon-7.svg",
      type: "password",
    },
    {
      name: "dob",
      placeholder: "Date of Birth",
      column: 6,
      icon: "/icon-8.svg",
      type: "date",
    },

    {
      name: "guardianName",
      placeholder: "Guardian",
      column: 6,
      icon: "/icon-6.svg",
      type: "text",
    },
    {
      name: "city",
      placeholder: "City",
      column: 6,
      icon: "/icon-9.svg",
      type: "text",
    },
    {
      name: "guardianEmail",
      placeholder: "Guardian Email",
      column: 6,
      icon: "/icon-11.svg",
      type: "email",
    },

    {
      name: "contactNumber",
      placeholder: "Contact Number",
      column: 6,
      icon: "/icon-11.svg",
      type: "text",
    },

    {
      name: "address",
      placeholder: "Address",
      column: 12,
      icon: "/icon-12.svg",
      type: "text",
    },
  ];
};

export const AddTeacherFields = () => {
  return [
    {
      name: "employeeName",
      placeholder: "Employee Name",
      column: 12,
      icon: "/icon-1.svg",
      type: "text",
    },
    {
      name: "campus",
      placeholder: "Campus",
      options: [],
      column: 12,
      icon: "/icon-5.svg",
      type: "dropdown",
    },
    {
      name: "password",
      placeholder: "Password",
      column: 6,
      icon: "/icon-7.svg",
      type: "password",
    },
    {
      name: "dob",
      placeholder: "Date of Birth",
      column: 6,
      icon: "/icon-8.svg",
      type: "date",
    },
    {
      name: "joiningDate",
      placeholder: "Joining Date",
      column: 6,
      icon: "/icon-6.svg",
      type: "date",
    },

    {
      name: "gender",
      placeholder: "Gender",
      options: ["Male", "Female"],
      column: 6,
      icon: "/icon-6.svg",
      type: "dropdown",
    },

    {
      name: "contactNumber",
      placeholder: "Contact Number",
      column: 6,
      icon: "/icon-11.svg",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      column: 6,
      icon: "/icon-11.svg",
      type: "email",
    },
  ];
};
