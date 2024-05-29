export const currentLoggedInUserType = () => {
  return localStorage.getItem("userType");
};

export const isCurrentUserStudent = () => {
  return localStorage.getItem("userType") === "student";
};

export const CoursesColors = [
  {
    textColor: "#000",
    backgroundColor: "#0BF4C8",
  },
  {
    textColor: "#fff",
    backgroundColor: "#FAD85D",
  },
  {
    textColor: "#fff",
    backgroundColor: "#0C7E40",
  },
  {
    textColor: "#fff",
    backgroundColor: "#7A1317",
  },
];

export const fetchSelectedCourseInfo = () => {
  return JSON.parse(localStorage.getItem("selectedCourseInfo" ?? false));
};

export const manipulateCourseTabsForAdmin = (tabs = [], params) => {
  return tabs?.map((item) => ({
    ...item,
    isAdminRoute: true,
    baseRoute: `grade/${params?.gradeId}/${params.campusName}/${params.campusId}/${params.sectionName}/${params.sectionId}/${params?.courseName}/${params?.courseId}/${item.baseRoute}`,
  }));
};
