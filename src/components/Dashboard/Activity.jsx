import RedDot from '@/assets/Icons/RedDot';
import React from 'react'

const Activity = ({ date, heading, link, status, time, readStatus }) => {
    return (
      <div
        className={`grid grid-cols-2 justify-between pb-4 ${
          readStatus ? "bg-[#F0F7FF]" : "bg-[#FEEEE7]"
        } `}
      >
        <div className="grid grid-cols-6 gap-12">
          <span className="col-span-1 body-medium text-white bg-custom-red rounded-8 flex justify-center items-center">
            {date}
          </span>
          <div className="col-span-3">
            <h2 className="h5-bold text-custom-dark-gren">{heading}</h2>
            <a className="text-custom-red">{link}</a>
          </div>
          <span
            className={`text-2xl ${
              status === "Upcoming" && "text-custom-golden"
            } ${status === "Due soon" && "text-custom-red"}`}
          >
            {status}
          </span>
        </div>
        <div className="flex flex-row">
          <div className="py-[0.4rem] pr-2">
            <RedDot />
          </div>
          <span className="text-custom-neutral-07">{time}</span>
        </div>
      </div>
    );
  };

export default Activity