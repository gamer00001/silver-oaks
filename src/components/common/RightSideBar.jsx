import { Calendar } from "react-date-range";
import teaching from "../../assets/RightBar/Teaching.png";
import UserProfile from "../Header/UserProfile";
import { ModalTop, MyInput } from ".";
import { useState } from "react";
import { useFormik } from "formik";
import { AddEventSchema } from "@/schema";

export const allowedPathsForRightSidebar = ["/", "/my-courses", "/course"];

const RightSideBar = () => {

  const [isAddEvent, setIsAddEvent] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState();

  const addEvent = () => {
    setIsAddEvent(!isAddEvent);
  };

  const handleCloseAddEventModal = () => {
    setIsAddEvent(!isAddEvent);
  };

  return (
    <aside className="py-[2.8rem] grid grid-cols-1 content-start gap-[3.2rem]">
      <div className="px-[1.9rem]">
        <UserProfile />
        <Calendar
          date={new Date()}
          onChange={(date)=>{
            const formattedDate = new Date(date);
            console.log(formattedDate.toISOString().split('T')[0])
            setDate(formattedDate.toISOString().split('T')[0]);
            setIsAddEvent(true);
          }}
          color="#7A1315"
        />
      </div>
      <div className="grid gap-[1.6rem] px-[1.7rem] py-[1.7rem]">
        <h1 className="h5-bold text-custom-dark-gren">Announcements</h1>
      </div>
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

const AddNewEventModal = ({ value, onAdd, onClose, editIndex, date }) => {
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
            date: date,
            type: "",
            description: "",
            location: "",
            duration: "",
          },
    validationSchema: AddEventSchema,
    onSubmit: (v) => {
      onAdd(values);
    },
  });
  return (
    <div className="grid gap-[3.6rem]">
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
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date && errors.date}
                name="date"
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
              <h1 className="body-medium h5">Location</h1>
            </div>
            <div>
              <MyInput
                type="text"
                placeholder="Enter Location"
                className="col-span-1 sm:col-span-6"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && errors.location}
                name="location"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Duration</h1>
            </div>
            <div>
              <MyInput
                type="number"
                placeholder="Enter Duration in days"
                className="col-span-1 sm:col-span-6"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.duration && errors.duration}
                name="duration"
              />
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
