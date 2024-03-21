import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Activity from "@/components/Dashboard/Activity";
import { getEventsByStudent } from "@/store/actions/eventActions";
import { Loader } from "@/components/common";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    studentEvents: { data = [], loading },
  } = useSelector((s) => s.eventReducer);

  useEffect(() => {
    const courses = localStorage.getItem("coursesList");
    const studentInfo = JSON.parse(localStorage.getItem("userInfo") ?? {});

    dispatch(
      getEventsByStudent({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId: courses,
            section: studentInfo?.sectionName,
          },
          dispatch,
        },
      })
    );
  }, []);

  if (loading) {
    <Loader type="screen" />;
  }

  return (
    <div className="p-8">
      <div className="grid gap-[1.6rem] px-[1.7rem] p-4">
        <h1 className="h5-bold text-custom-dark-gren">Notifications</h1>
      </div>
      {data?.eventList?.map((activity, index) => (
        <div class="p-4 justify-between" key={index}>
          <Activity
            date={activity.id}
            heading={activity.title}
            link={activity.description}
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
