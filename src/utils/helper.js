export const currentLoggedInUserType = () => {
  return localStorage.getItem("userType");
};

export const isCurrentUserStudent = () => {
  return localStorage.getItem("userType") === "student";
};

export const fetchCurrentUserInfo = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
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

export const prepareLineChartData = (list = []) => {
  let categories = [],
    marksSeriesData = [],
    populationSeriesData = [];

  categories = list.map((item) => item.grade).filter((item) => item !== null);
  marksSeriesData = list.map((item) => item.percent);
  populationSeriesData = list.map((item) => item.population);

  return {
    categories,
    marksSeriesData,
    populationSeriesData,
  };
};

export function removeEmptyValues(obj) {
  // Create a new object to hold the filtered properties
  const newObj = {};

  // Iterate over each key in the original object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      // Only add properties to the new object if they are not null, undefined, or an empty string
      if (value !== null && value !== undefined && value !== "") {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}

export async function fetchFileFromUrl(url) {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Read the response as a Blob
    const blob = await response.blob();

    // Create a new file from the Blob
    const file = new File([blob], "downloaded-file.jpg", { type: blob.type });

    return file;
  } catch (error) {
    console.error("There was an error fetching the file:", error);
  }
}
