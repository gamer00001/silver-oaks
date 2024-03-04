import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "@emotion/styled";
import CopyToClipboard from "react-copy-to-clipboard";
import { Loader, ModalTop, MyInput } from "@/components/common";
import { useFormik } from "formik";
import { AddEventSchema } from "@/schema";
import { motion } from "framer-motion";
import * as XLSX from "xlsx"; // Import xlsx library
import { useDispatch, useSelector } from "react-redux";
import { addEvent, getEvents } from "@/store/actions/eventActions";
import { getCourses } from "@/store/actions/coursesActions";
import { useNavigate } from "react-router-dom";
import { isCurrentUserStudent } from "@/utils/helper";


const ManageEvents = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const { getEventsData } = useSelector((s) => s.eventReducer);

  useEffect(() => {
    dispatch(
      getEvents({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            teacherEmail: localStorage.getItem("email"),
          },
        },
      })
    );
  }, []);

  const addCalanderEvent = () => {
    setIsAddEvent(!isAddEvent);
  };

  const handleCloseAddEventModal = () => {
    setIsAddEvent(!isAddEvent);
  };

  const exportToExcel = () => {
    const header = ["Title", "Date", "Type", "Description", "Duration"];
    const data = events.map((event) => [
      event.title,
      event.date,
      event.type,
      event.description,
      event.duration,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "events.xlsx");
  };

  const StyleWrapper = styled.div`
    .fc button {
      background: #7a1315;
    }
  `;

  return getEventsData?.loading ? (
    <Loader type="screen" />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-rows-[auto_auto_auto] gap-8 p-12"
    >
      {getEventsData?.loading && <Loader type="screen" />}
      <h1 className="text-[4rem] font-bold -mt-24">Manage Events</h1>
      {!isCurrentUserStudent() && <div className="flex justify-end">
        <motion.button
          onClick={addCalanderEvent}
          className="grid-center text-[1.5rem] text-white hover:opacity-70 duration-300 bg-custom-red rounded-full p-4 transition-opacity "
          whileHover={{ scale: 1.05 }}
        >
          Add New Event
        </motion.button>
      </div>}
      <div className="flex flex-row justify-center items-center ">
        <StyleWrapper className="w-5/6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getEventsData?.data?.eventList?.map((item) => {
              return {
                title: item.title,
                date: item.eventDate,
              };
            })}
            dateClick={isCurrentUserStudent() ? "" : addCalanderEvent}
            eventContent={renderEventContent}
          />
        </StyleWrapper>
      </div>
      <div className="flex flex-row justify-end gap-8">
        <motion.button
          onClick={() => setIsAddEvent(true)}
          className="grid-center text-[1.5rem] text-white hover:opacity-70 duration-300 bg-custom-red rounded-full p-6 transition-opacity"
          whileHover={{ scale: 1.05 }}
        >
          Get Calendar URL
        </motion.button>
        <motion.button
          onClick={exportToExcel}
          className="grid-center text-[1.5rem] text-white hover:opacity-70 duration-300 bg-custom-red rounded-full p-4 transition-opacity w-[14rem]"
          whileHover={{ scale: 1.05 }}
        >
          Export
        </motion.button>
      </div>
      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={Boolean(isAddEvent)}
        onClose={handleCloseAddEventModal}
      >
        <AddNewEventModal
          onAdd={(newEvent) => {
            setEvents([...events, newEvent]);
            handleCloseAddEventModal();
            dispatch(
              addEvent({
                payload: {
                  body: {
                    ...newEvent,
                  },
                },
                onSuccess: () => console.log("Hello"),
                onError: () => navigate("/404", { replace: true }),
              })
            );
          }}
          onClose={() => {
            handleCloseAddEventModal();
          }}
          value={events}
          editIndex={editIndex}
        />
      </ModalTop>
    </motion.div>
  );
};

export default ManageEvents;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const AddNewEventModal = ({ value, onAdd, onClose, editIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
