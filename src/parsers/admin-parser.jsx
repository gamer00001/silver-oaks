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
