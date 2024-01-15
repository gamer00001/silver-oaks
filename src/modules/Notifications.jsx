import Activity from "@/components/Dashboard/Activity";
import React from "react";

const demoActivityData = [
  {
    date: "07",
    heading: "Meeting with VC",
    link: "https://zoom.com",
    status: "Upcoming",
    time: "10:00 AM",
    readStatus: false,
  },
  {
    date: "08",
    heading: "Admin Meeting",
    link: "https://example.com",
    status: "Due soon",
    time: "3:00 PM",
    readStatus: true,
  },
];

const Notifications = () => {
  return (
    <div className="p-8">
      <div className="grid gap-[1.6rem] px-[1.7rem] p-4">
        <h1 className="h5-bold text-custom-dark-gren">Notifications</h1>
      </div>
      {demoActivityData.map((activity, index) => (
        <div class="p-4 justify-between">
          <Activity
            key={index}
            date={activity.date}
            heading={activity.heading}
            link={activity.link}
            status={activity.status}
            time={activity.time}
            readStatus={activity.readStatus}
          />
        </div>
      ))}
    </div>
  );
};

export default Notifications;
