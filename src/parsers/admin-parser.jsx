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

export const parseAddQuizDataForApi = (formValues, params) => {
  return {
    courseId: params.courseId,
    // description: "string",
    dueDate: formValues.dueDate,
    quizTitle: formValues.quizTitle,
    term: formValues.term,
    time: formValues.time,
    totalMarks: formValues.totalMarks,
    visibility: true,
    quizQuestions: formValues?.questions.map((item) => ({
      question: item.title,
      optionFour: item.options[3],
      optionOne: item.options[0],
      optionThree: item.options[2],
      optionTwo: item.options[1],
      answer: item.options[item?.correctOption],
    })),
  };
};

export const parseAddExamDataForApi = (formValues, params) => {
  return {
    courseId: params.courseId,
    // description: "string",
    dueDate: formValues.dueDate,
    examTitle: formValues.examTitle,
    term: formValues.term,
    time: formValues.time,
    totalMarks: formValues.totalMarks,
    visibility: true,
    examQuestions: formValues?.questions.map((item) => ({
      question: item.title,
      optionFour: item.options[3],
      optionOne: item.options[0],
      optionThree: item.options[2],
      optionTwo: item.options[1],
      answer: item.options[item?.correctOption],
    })),
  };
};

export const parseAddOgaDataForApi = (formValues, params) => {
  return {
    courseId: params.courseId,
    // description: "string",
    dueDate: formValues.dueDate,
    ogaTitle: formValues.ogaTitle,
    term: formValues.term,
    time: formValues.time,
    totalMarks: formValues.totalMarks,
    visibility: true,
    ogaQuestions: formValues?.questions.map((item) => ({
      question: item.title,
      optionFour: item.options[3],
      optionOne: item.options[0],
      optionThree: item.options[2],
      optionTwo: item.options[1],
      answer: item.options[item?.correctOption],
    })),
  };
};

export const prepareParseInitialValues = (quizData) => {
  if (quizData) {
    return {
      dueDate: quizData?.dueDate,
      quizTitle: quizData?.quizTitle,
      term: quizData?.term,
      time: quizData?.time,
      totalMarks: quizData?.totalMarks,
      visibility: true,
      questions: quizData?.quizQuestions?.map((item) => {
        const options = [
          item.optionOne,
          item.optionTwo,
          item.optionThree,
          item.optionFour,
        ];
        return {
          title: item?.question,
          options,
          correctOption: options.findIndex((option) => option === item.answer),
        };
      }),
    };
  } else {
    return {};
  }
};
