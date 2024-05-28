export const parseAddStudentData = (data) => {
  return {
    address: data?.address,
    campusName: data.campusName,
    city: data?.city,
    dateOfBirth: data?.dateOfBirth,
    gender: data?.gender,
    grade: data.grade,
    guardianEmail: data?.guardianEmail,
    guardianName: data.guardianName,
    guardianPhoneNumber: data?.guardianPhoneNumber,
    password: data?.password,
    rollNumber: data?.rollNumber,
    sectionName: data.section,
    studentName: data?.studentName,
  };
};

export const parseAddTeacherData = (data) => {
  return {
    // address: data,
    campusName: data.campusName,
    dateOfBirth: data.dateOfBirth,
    email: data.email,
    employeeName: data.employeeName,
    gender: data.gender,
    joiningDate: data.joiningDate,
    password: data.password,
    phoneNumber: data.phoneNumber,
    // grade: data.grade,
    // sectionName: data.sectionName,
    // section: data.section,
    teacherSectionList: [
      {
        grade: data.grade,
        section: data.section,
      },
    ],
    // teacherSectionList: [
    //   {
    //     grade: data,
    //     id: 0,
    //     section: data,
    //     teacherId: 0,
    //   },
    // ],
  };
};
