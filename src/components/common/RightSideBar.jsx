import { Calendar } from "react-date-range";
import teaching from "../../assets/RightBar/Teaching.png";
import UserProfile from "../Header/UserProfile";
import { Loader, ModalTop, MyInput } from ".";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AddEventSchema } from "@/schema";
import { useNavigate } from "react-router-dom";
import Tick from "@/assets/Icons/Tick";
import Flag from "@/assets/Icons/Flag";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "@/store/actions/coursesActions";
import { isCurrentUserStudent } from "@/utils/helper";
import { getEventsByStudent } from "@/store/actions/eventActions";

export const allowedPathsForRightSidebar = () => {
  if (isCurrentUserStudent()) {
    return [
      "/enrolled-courses",
      "/notifications",
      "/enrolled-courses",
      "/enrolled-courses/lectures",
    ];
  } else {
    return ["/", "/course", "/my-courses", "/notifications"];
  }
};

const RightSideBar = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    studentEvents: { data, loading },
  } = useSelector((s) => s.eventReducer);

  const addEvent = () => {
    setIsAddEvent(!isAddEvent);
  };

  const handleCloseAddEventModal = () => {
    setIsAddEvent(!isAddEvent);
  };

  useEffect(() => {
    const courses = localStorage.getItem("coursesList");

    dispatch(
      getEventsByStudent({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId: courses,
          },
          dispatch,
        },
      })
    );
  }, []);

  return (
    <aside className="py-[2.8rem] grid grid-cols-1 content-start gap-[3.2rem]">
      <div className="px-[1.9rem]">
        <UserProfile />
        <Calendar
          date={new Date()}
          onChange={(date) => {
            const formattedDate = new Date(date);
            console.log(formattedDate.toISOString().split("T")[0]);
            setDate(formattedDate.toISOString().split("T")[0]);
            setIsAddEvent(true);
          }}
          color="#7A1315"
        />
      </div>
      <div className="flex flex-row justify-between items-center gap-[1.6rem] px-[1.7rem] py-[1.7rem] ">
        <h1 className="h5-bold text-custom-dark-gren">Notifications</h1>
        <h1
          className="text-[1.5rem] text-red-800 cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          see all
        </h1>
      </div>
      {data?.eventList?.map((event) => (
        <NotificationCard
          key={event.id}
          Title={event.title}
          Time={event.time}
          Logo={<Tick />}
        />
      ))}
      {/* <NotificationCard
        Title="New Features in the Gradebook"
        Time="Yesterday"
        Logo={<Tick />}
      />
      <NotificationCard
        Title="Parent-Teacher Conference Schedule"
        Time="23 June 2021"
        Logo={<Flag />}
      /> */}
      <img src={teaching} />

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={Boolean(isAddEvent)}
        onClose={handleCloseAddEventModal}
      >
        <AddNewEventModal
          onAdd={(newEvent) => {
            setEvents([...events, newEvent]);
            handleCloseAddEventModal();
          }}
          onClose={() => {
            handleCloseAddEventModal();
          }}
          value={events}
          editIndex={editIndex}
          date={date}
        />
      </ModalTop>
    </aside>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const NotificationCard = ({ Title, Time, Logo }) => {
  return (
    <div className="p-4 flex flex-row">
      {Logo}
      <div className="flex flex-col ml-4">
        <h1 className="text-[1.7rem] font-semibold">{Title}</h1>
        <h1>{Time}</h1>
      </div>
    </div>
  );
};

const AddNewEventModal = ({ value, onAdd, onClose, editIndex }) => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((s) => s.courseReducer);

  useEffect(() => {
    dispatch(
      getCourses({
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, []);

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues:
      editIndex !== null
        ? value[editIndex]
        : {
            title: "",
            eventDate: "",
            type: "",
            description: "",
            time: "",
            courseId: "",
            teacherId: "1",
          },
    validationSchema: AddEventSchema,
    onSubmit: (v) => {
      onAdd(values);
    },
  });
  return (
    <div className="grid gap-[3.6rem]">
      {coursesData.loading && <Loader type="screen" />}
      <h2 className="text-[2.5rem] font-semibold text-black leading-[160%] flex justify-center items-center border-4 border-dashed border-custom-golden">
        Add New Event
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-[7.7rem]">
        <div className="flex flex-col gap-x-[2.1rem] gap-y-[1.6rem]">
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Event Title</h1>
            </div>
            <div>
              <MyInput
                type="text"
                placeholder="Enter Title"
                className="col-span-1 sm:col-span-6"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
                name="title"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Date</h1>
            </div>
            <div>
              <MyInput
                type="date"
                placeholder="Enter date"
                className="col-span-1 sm:col-span-6"
                value={values.eventDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.eventDate && errors.eventDate}
                name="eventDate"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Type of Event</h1>
            </div>
            <div>
              <MyInput
                type="select"
                placeholder="Enter Type of Event"
                className="col-span-1 sm:col-span-6"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.type && errors.type}
                name="type"
              >
                <option value="">Select Type of Event</option>
                <option value="Writing Competition">Writing Competition</option>
                <option value="Art Competition">Art Competition</option>
              </MyInput>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Description</h1>
            </div>
            <div>
              <MyInput
                type="textarea"
                placeholder="Enter description"
                className="col-span-12"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                name="description"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Time</h1>
            </div>
            <div>
              <MyInput
                type="number"
                placeholder="Enter time in days"
                className="col-span-1 sm:col-span-6"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.time && errors.time}
                name="time"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Select Course</h1>
            </div>
            <div>
              <MyInput
                type="select"
                placeholder="Select a Course"
                className="col-span-1 sm:col-span-6"
                value={values.courseId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.courseId && errors.courseId}
                name="courseId"
              >
                <option value="">Select a Course</option>
                {coursesData.data?.courseList?.map((course, index) => (
                  <option value={course?.courseId}>{course?.courseName}</option>
                ))}
              </MyInput>
            </div>
          </div>
        </div>

        <div className="grid gap-[3.2rem] justify-start grid-cols-[auto_auto]">
          <button
            className="p-[1.3rem_6.3rem] text-custom-dark-gren button opacity-button border bg-custom-button-color border-custom-button-color rounded-[.8rem] disabled:opacity-50"
            type="submit"
            disabled={!dirty}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="p-[1.3rem_6.3rem] text-custom-dark-gren button opacity border border-custom-button-color rounded-[.8rem]"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightSideBar;
