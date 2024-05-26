import React from "react";

const StatsCard = ({
  bgColor,
  title = "Total Registered Campuses",
  icon = "/campus-icon.svg",
  subtitle = "22",
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor ?? "" }}
      className={`bg-[#${bgColor}] rounded-xl p-8 flex-1 leading-5`}
    >
      <div className="flex justify-between gap-6">
        <h1 className="text-4xl font-semibold leading-tight">{title}</h1>

        <img src={icon} alt="icon" />
      </div>

      <h1 className="text-5xl font-semibold pt-5">{subtitle}</h1>
    </div>
  );
};

export default StatsCard;
