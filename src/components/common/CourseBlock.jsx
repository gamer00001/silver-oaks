import { useNavigate } from "react-router-dom";

const CourseBlock = ({
  link,
  bgColor,
  data,
  width = "w-2/6",
  bookIcon = "w-36",
  title = "English",
  height = "h-auto",
  heading = "Grade 1",
  textColor = "#131215",
  titleFontSize = "text-5xl",
  headingFontSize = "text-md",
}) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: bgColor ?? "#0BF4C8" }}
      className={`pt-12 rounded-3xl flex flex-col p-10 ${width} ${height} relative`}
    >
      <img className="absolute" src="/course-back-icon.svg" alt="course-icon" />

      <span
        className={`text-[${textColor}] ${headingFontSize} font-semibold`}
        style={{ color: textColor ?? "#000" }}
      >
        {heading}
      </span>
      <span
        style={{ color: textColor ?? "#000" }}
        className={`text-[${textColor}] ${titleFontSize} pt-4 font-semibold`}
      >
        {title}
      </span>
      {link && (
        <span
          style={{ color: textColor ?? "#000" }}
          onClick={() => {
            localStorage.setItem("selectedCourseInfo", JSON.stringify(data));
            navigate(link);
          }}
          className="text-[#131215] text-md underline pt-6 cursor-pointer font-semibold"
        >
          View Course
        </span>
      )}

      <img
        className={`absolute right-0 bottom-0 ${bookIcon}`}
        src="/books-icon.svg"
        alt="course-icon"
      />
    </div>
  );
};

export default CourseBlock;