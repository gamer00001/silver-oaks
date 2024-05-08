import React from "react";

const GradeBlock = ({ title = "", subtitle = "" }) => {
  return (
    <div className="rounded-2xl w-full h-full border border-custom-red cursor-pointer">
      <div className="rounded-2xl w-auto  bg-custom-red flex justify-center">
        <img
          className="h-60 my-12 rounded-2xl"
          src="/grade-icon.svg"
          alt="grade"
        />
      </div>

      <div className="p-8">
        <span className="text-black font-semibold text-3xl">{title}</span>
        <br />
        <span className="text-[#78858F] font-normal text-xl">{subtitle}</span>
      </div>
    </div>
  );
};

export default GradeBlock;
