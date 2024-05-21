export const parseAddStudentData = (data) => {
  return {
    address: data?.address,
    // campusName: data,
    city: data?.city,
    dateOfBirth: data?.dateOfBirth,
    gender: data?.gender,
    // grade: data,
    guardianEmail: data?.guardianEmail,
    guardianName: data.guardianName,
    guardianPhoneNumber: data?.guardianPhoneNumber,
    password: data?.password,
    rollNumber: data?.rollNumber,
    // sectionName: data,
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
    teacherSectionList: [],
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
