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
import { Avatar } from "@/assets/common";

const Lectures = () => {
  const lectures = [
    {
      id: '2354262',
      lectureNo: "01",
      title: "ICT and Emerging Technologies",
      link: 'https://www.youtube.com/watch?v=_CZe_bZyd5M'
    },
    {
      id: '463645643',
      lectureNo: "02",
      title: "Cloud Computing",
      link: 'https://www.youtube.com/watch?v=8C_kHJ5YEiA'
    },
    {
      id: '34654373',
      lectureNo: "03",
      title: "Computer Program",
      link: 'https://www.youtube.com/watch?v=5AmWpf6H7Ac'
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      <img src={gradeImg} className="w-5/6 rounded-[2rem]" />
      <div className="w-5/6">
        <Post />
      </div>
      {lectures.map((item, k) => (
        <div className="w-5/6">
          <LectureCard lid={item.id} lectureNo={item.lectureNo} title={item.title} link={item.link}/>
        </div>
      ))}
    </div>
  );
};

export default Lectures;

const Post = () => {
  const {
    loginUserData: { user },
  } = useSelector((s) => s.authReducer);
  const [canPost, setCanPost] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (text.length > 0) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [text]);

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div>
          <div className="flex flex-row h-[6rem] px-[1.9rem] justify-between items-center">
            <div className="flex gap-4">
              <img
                className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
                src={
                  user?.profile_image
                    ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${user?.profile_image}`
                    : Avatar
                }
                alt="Admin"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
              <input
                type="text"
                placeholder="Announce something to the class"
                className="bg-[#F6F5F5] rounded-[1rem] h-[4rem] text-[2rem] w-[34rem] "
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div
              className={`flex flex-col gap-2 ${canPost ? "block" : "hidden"}`}
            >
              <input
                type="submit"
                value={"Post"}
                className="bg-custom-red text-white rounded-[2rem] w-[8rem] h-[3rem]"
              />
              <button className="h-[3rem] border-[0.1rem] rounded-[2rem] border-custom-red">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </MUICard>
  );
};

const LectureCard = ({ lid, lectureNo, title, link }) => {
  const [expanded, setExpanded] = useState(false);
  const [menu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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
                Lecture {lectureNo}:{" "}
              </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
            <div className={`flex flex-row ${expanded ? "block" : "hidden"} cursor-pointer`} onClick={()=>window.open(link)}>
              <PlayIcon />
              <h1 className="font-bold text-[1.5rem] text-custom-red">
                {title}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end items-end">
            <div onClick={() => setIsMenu(!menu)}>
              <MenuIcon />
            </div>
            {menu && <VisibilityMenu />}
            <button
              className="text-[2rem] font-semibold text-custom-red"
              onClick={() => navigate(`/course/${id}/lecture/${lid}`)}
            >
              Reports
            </button>
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
