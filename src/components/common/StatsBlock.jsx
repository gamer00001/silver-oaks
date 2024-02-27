import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const StatsBlock = ({
  icon,
  value = 60,
  bgColor = "#ECFFF5",
  heading = "Course Stats",
  title = "Term Completion",
  activeColor = "#F93535",
  inactiveColor = "#05AF3552",
}) => {
  return (
    <div className={`bg-[${bgColor}] p-10 rounded-3xl w-2/4`}>
      <span className="text-lg text-[#00000080] font-semibold">{heading}</span>

      <div className="flex justify-between gap-10">
        <div className="flex items-center gap-4 pt-4">
          <img src={icon ?? "/course-stats-icon.svg"} alt="icon" />

          <span className="text-black text-2xl font-semibold">{title}</span>
        </div>

        <div>
          <div style={{ width: 70, height: 70 }}>
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              className="text-red font-semibold"
              styles={buildStyles({
                pathColor: activeColor,
                textColor: "#212633",
                fontWeight: "bold",
                trailColor: inactiveColor,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBlock;
