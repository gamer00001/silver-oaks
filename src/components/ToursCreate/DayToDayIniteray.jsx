import { useState } from "react";
import { DeleteModal, Image, ModalTop, MyInput } from "../common";
import { Plus } from "@/assets/Icons";
import { useFormik } from "formik";
import { dayToDayIniteraySchema } from "@/schema";
import { CiEdit, CiTrash } from "react-icons/ci";
import { imageUpload } from "@/store";
import { useDispatch } from "react-redux";
import { CONSTANTS } from "@/constants";

const DayToDayIniteray = ({ error, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  return (
    <div className="grid gap-[.5rem]">
      <label className="body-medium text-custom-dark-gren">
        Day To Day Itinerary
      </label>

      <div className="grid gap-[1.6rem]">
        {value.map((v, i) => (
          <DayToDayIniterayItem
            key={i}
            {...v}
            index={i}
            value={value}
            onChange={onChange}
            onEdit={() => setEditIndex(i)}
          />
        ))}

        <button
          onClick={() => setOpen(true)}
          className="p-[1.6rem] border border-dashed border-[#AEAEAE]
          rounded-[.4rem] grid-center text-custom-dark-gren text-[3.2rem]
          bg-[#F1F1F1] opacity"
          type="button"
        >
          <Plus />
        </button>
      </div>

      {error && <p className="text-red-500 caption">{error}</p>}

      <ModalTop
        open={open || editIndex !== null}
        onClose={() => {
          setOpen(false);
          setEditIndex(null);
        }}
        className="!max-w-[105.6rem] p-[3.7rem_2rem_5.1rem] xxs:p-[3.7rem_3rem_5.1rem] xs:p-[3.7rem_4rem_5.1rem] sm:p-[3.7rem_5rem_5.1rem]"
      >
        <AddNewDayToDayIniterayModal
          onAdd={(v) => {
            onChange(v);
            setEditIndex(null);
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
            setEditIndex(null);
          }}
          value={value}
          editIndex={editIndex}
        />
      </ModalTop>
    </div>
  );
};

export default DayToDayIniteray;

const DayToDayIniterayItem = ({
  img,
  title,
  description,
  index,
  value,
  onChange,
  onEdit,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="grid gap-[3.3rem] grid-cols-2 relative shadow-[0px_2px_10px_0px_rgba(57,_85,_86,_0.25)] rounded-[.8rem]">
      <Image
        className="h-[15.3rem] w-full object-cover rounded-[.8rem_0rem_0rem_.8rem]"
        src={typeof img === "string"
        ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${img}`
        : img}
        alt={title}
        errorMessage="Image not found"
        containerClassName="h-[15.3rem]"
      />
      <div className="grid gap-[2.4rem] p-[2.4rem_2rem_2.4rem_0] content-start">
        <h3 className="max-w-[50.9rem] caption text-custom-black line-clamp-1 h-[1.6rem]">
          {title}
        </h3>

        <p className="max-w-[50.9rem] caption text-custom-dark-gren line-clamp-4 h-[6.5rem] opacity-50">
          {description}
        </p>
      </div>

      <div className="absolute top-[1.3rem] right-[1.5rem] grid grid-cols-[auto_auto] items-center justify-end gap-[.5rem]">
        <button
          className="bg-black/80 text-white text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          onClick={onEdit}
        >
          <CiEdit />
        </button>
        <button
          className="bg-black/80 text-white text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <CiTrash />
        </button>
      </div>

      <DeleteModal
        onClose={() => setIsDeleteModalOpen(false)}
        onOkay={() => {
          onChange(value.filter((_, i) => i !== index));
          setIsDeleteModalOpen(false);
        }}
        open={isDeleteModalOpen}
        deleteItemName="daytodayiniterary"
      />
    </div>
  );
};

const AddNewDayToDayIniterayModal = ({ value, onAdd, onClose, editIndex }) => {
  const dispatch = useDispatch();
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
            img: null,
            title: "",
            description: "",
            hotelName: "",
            meal: [],
          },
    validationSchema: dayToDayIniteraySchema,
    onSubmit: (v) => {
      dispatch(
        imageUpload({
          payload: { images: [v.img] },
          onSuccess: ({ files: [img] }) => {
            v.img = img;
            if (editIndex !== null) {
              const copy = [...value];
              copy[editIndex] = v;
              onAdd(copy);
            } else onAdd([...value, v]);
          },
        })
      );
    },
  });
  return (
    <div className="grid gap-[3.6rem]">
      <h2 className="text-[2.5rem] font-semibold text-black leading-[160%]">
        Day To Day Itinerary
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-[7.7rem]">
        <div className="grid gap-x-[2.1rem] gap-y-[3.6rem] items-start grid-cols-12">
          <MyInput
            type="text"
            label="Title"
            placeholder="Enter Title"
            className="col-span-12 sm:col-span-6"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
            name="title"
          />
          <MyInput
            type="text"
            label="Hotel Name"
            placeholder="Enter hotel name"
            className="col-span-12 sm:col-span-6"
            value={values.hotelName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.hotelName && errors.hotelName}
            name="hotelName"
          />
          <MyInput
            type="textarea"
            label="Description"
            placeholder="Enter description"
            className="col-span-12"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            name="description"
          />
          <MyInput
            type="file"
            label="Image"
            accept=".png, .jpeg, .jpg"
            className="col-span-12"
            value={typeof values.img === "string" ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.img}` : values.img}
            onChange={(v) => setFieldValue("img", v)}
            onBlur={handleBlur}
            error={touched.img && errors.img}
            name="img"
          />
          <MealCheckBoxes
            className="col-span-12"
            value={values.meal}
            onChange={(v) => setFieldValue("meal", v)}
            onBlur={handleBlur}
            error={touched.meal && errors.meal}
            name="meal"
          />
        </div>

        <div className="grid gap-[3.2rem] justify-start grid-cols-[auto_auto]">
          <button
            className="p-[1.3rem_6.3rem] text-custom-dark-gren button opacity-button border bg-custom-button-color border-custom-button-color rounded-[.8rem] disabled:opacity-50"
            type="submit"
            disabled={!dirty}
          >
            Add
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

const MealCheckBoxes = ({ value, onChange, error }) => {
  return (
    <label className="grid gap-[.5rem]">
      <span className="body-medium text-custom-dark-gren">Meal</span>

      <div className="grid gap-[.5rem]">
        <div className="grid gap-x-[2.9rem] gap-y-[1rem] grid-cols-[auto_auto_auto] sm:grid-cols-[auto_auto_auto_auto] justify-start">
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Lunch"
            label="Lunch"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Dinner"
            label="Dinner"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Breakfast"
            label="Breakfast"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Super"
            label="Super"
          />
        </div>

        {error && (
          <p className="text-red-500 caption col-span-3 xs:col-span-4">
            {error}
          </p>
        )}
      </div>
    </label>
  );
};

const CustomCheckBox = ({ value, onChange, name, ...rest }) => {
  return (
    <MyInput
      {...rest}
      type="checkbox"
      className="px-[2rem] py-[1.1rem] bg-[#F5F5F5] rounded-[.4rem]"
      onChange={() =>
        onChange(
          value && value.includes(name)
            ? value?.filter((v) => v !== name)
            : Array.from(new Set([...value, name]))
        )
      }
      checked={value && value.includes(name)}
    />
  );
};
