import React, { useEffect, useState } from "react";
import gradeImg from "@/assets/common/grade1.png";
import { CardContent } from "@mui/material";
import MUICard from "@mui/material/Card";
import { useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import LectureIcon from "@/assets/Icons/LectureIcon";
import PlayIcon from "@/assets/Icons/PlayIcon";
import MenuIcon from "@/assets/Icons/MenuIcon";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Invisible from "@/assets/Icons/Invisible";
import Visible from "@/assets/Icons/Visible";

const Assignments = () => {
  const Assignments = [
    {
      id: '345634',
      assignmentNo: "01",
      title: "ICT and Emerging Technologies",
      attempts: "23",
      total: "26",
      grading: '2'
    },
    {
      id: '3254663',
      assignmentNo: "02",
      title: "ICT and Emerging Technologies",
      attempts: "23",
      total: "26",
      grading: '2'
    },
    {
      id: '7567343',
      assignmentNo: "03",
      title: "ICT and Emerging Technologies",
      attempts: "23",
      total: "26",
      grading: '2'
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      <img src={gradeImg} className="w-5/6 rounded-[2rem]" />
      {Assignments.map((item, k) => (
        <div className="w-5/6">
          <QuizCard aid={item.id} assignmentNo={item.assignmentNo} title={item.title} attempts={item.attempts} total={item.total} grading={item.grading}/>
        </div>
      ))}
    </div>
  );
};

export default Assignments;


const QuizCard = ({ aid, assignmentNo, title, attempts, total, grading }) => {
  const [expanded, setExpanded] = useState(false);
  const [menu, setIsMenu] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div class="flex justify-between items-start ">
          <div className="grid grid-col-2 gap-4 px-[1.9rem]">
            <div className="flex flex-row justify-center items-center gap-4">
              <LectureIcon />
              <NavLink>
                <span
                  className="ml-auto"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "▼" : "▲"}
                </span>
              </NavLink>
              <h1 className="font-extrabold text-[1.5rem]">
                Assignment {assignmentNo}:{" "}
              </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
              <h1 className="font-bold text-[1.5rem] text-custom-red">
                {attempts+' '} of {' '+total+' '} attempted
              </h1>
            <div className={`flex flex-row ${expanded ? "block" : "hidden"} justify-center items-center`}>
              <table>
                <tr>
                  <td><span className="body-medium">Participants</span></td>
                  <td className="pl-8"><span className="body-regular">{total}</span></td>
                </tr>
                <tr>
                  <td><span className="body-medium">Submitted</span></td>
                  <td className="pl-8"><span className="body-regular">{attempts}</span></td>
                </tr>
                <tr>
                  <td><span className="body-medium">Need Grading</span></td>
                  <td className="pl-8"><span className="body-regular">{grading}</span></td>
                </tr>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end items-end">
            <div onClick={() => setIsMenu(!menu)}>
              <MenuIcon />
            </div>
            {menu && <VisibilityMenu />}
            <button className="text-custom-red font-bold text-[1.5rem]" onClick={()=>navigate(`/course/${id}/assignment/${aid}`)}>View Assignment</button>
            <button className="text-custom-red font-bold text-[1.5rem]" onClick={()=>navigate(`/course/${id}/assignmentSummary/${aid}`)}>View all submissions</button>
          </div>
        </div>
      </CardContent>
    </MUICard>
  );
};

const VisibilityMenu = () => {
  const items = [
    {
      title: "Invisible to Students",
      icon: <Invisible />,
    },
    {
      title: "Visible to Students",
      icon: <Visible />,
    },
  ];
  return (
    <div
      className="absolute -my-[6rem] mt-32 bg-white rounded-md shadow-lg overflow-hidden z-20"
      style={{ width: "28rem" }}
    >
      {items.map((item, k) => (
        <div className="py-2" key={k}>
          <NavLink className="flex flex-row justify-between items-center px-4 py-3 border-b hover:bg-[#FBBC05] -mx-2">
            <h1 className="text-gray-600 text-lg mx-2">
              <span className="font-bold">{item.title}</span>
            </h1>
            <div>{item.icon}</div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};
