import { GreenDot } from "@/assets/Icons";
import { Link, useLocation, useParams } from "react-router-dom";

const CourseHeader = () => {
  const tabs = [
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
      title: "Exam",
      to: "./exam",
    },
  ];

  const { id } = useParams();
  const { pathname } = useLocation();

  return (
    <header>
      <div className="flex flex-row">
        <Link to={"/my-courses"}>
          <h1 className="body-medium mb-8 font-extrabold">My Courses {">"} </h1>
        </Link>
        <span className="body-regular">
          Grade1{"("}Alliums{")"}
        </span>
      </div>
      <div className="w-full flex flex-row flex-wrap body-regular md:body-medium md:pr-[36rem] gap-8 mb-4">
        {tabs.map((item, k) => (
          <Link to={`/course/${item.to}/${id}`}>
            <h1 key={k} className={`${pathname.includes(item.to.substring(1))?'text-gray-900':'text-gray-400'} hover:text-gray-900`}>{item.title}</h1>
            <div className={`${pathname.includes(item.to.substring(1))?'block':'hidden'} flex justify-center items-center`}>
            <GreenDot/>
            </div>
          </Link>
        ))}
      </div>
      <div className="gap-16 border-b-2 border-gray-500" />
    </header>
  );
};

export default CourseHeader;
