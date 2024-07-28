import React from "react";
import { Link } from "react-router-dom";

const GradeBlock = ({ title = "", subtitle = "", route, image, onClick }) => {
  return (
    <Link to={route}>
      <div
        className="rounded-2xl w-full h-full border border-custom-red cursor-pointer"
        onClick={onClick}
      >
        <div className="rounded-2xl w-auto  bg-custom-red flex justify-center">
          <img
            className="h-60 my-12 rounded-2xl"
            src={image ?? "/grade-icon.svg"}
            alt="grade"
          />
        </div>

        <div className="p-8">
          <span className="text-black font-semibold text-3xl">{title}</span>
          <br />
          <span className="text-[#78858F] font-normal text-xl">{subtitle}</span>
        </div>
      </div>
    </Link>
  );
};

export default GradeBlock;
