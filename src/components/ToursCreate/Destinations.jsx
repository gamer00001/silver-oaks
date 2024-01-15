import { Plus } from "@/assets/Icons";
import { useEffect, useState } from "react";
import { DeleteModal, Image, ModalTop, MyInput } from "../common";
import { TestImage } from "@/assets/common";
import { useFormik } from "formik";
import { CiTrash } from "react-icons/ci";
import { useQueryParams } from "@/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDestinations } from "@/store/actions";

const Destinations = ({ error, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-[.5rem]">
      <label className="body-medium text-custom-dark-gren">Destinations</label>

      <div className="grid gap-[.5rem]">
        <div className="grid gap-[1.6rem]">
          {value.map((v, i) => (
            <DestinationsItem
              key={i}
              _id={v}
              onChange={onChange}
              value={value}
            />
          ))}

          <button
            onClick={() => setOpen(true)}
            className="p-[1.6rem] border border-dashed border-[#AEAEAE]
          rounded-[.4rem] grid-center w-full text-custom-dark-gren text-[3.2rem]
          bg-[#F1F1F1] opacity"
            type="button"
          >
            <Plus />
          </button>
        </div>

        {error && <p className="text-red-500 caption">{error}</p>}
      </div>

      <ModalTop
        open={open}
        onClose={() => setOpen(false)}
        className="!max-w-[105.6rem] p-[0_2rem_0] xxs:p-[0_3rem_0] xs:p-[0_4rem_0] sm:p-[0_5rem_0]"
      >
        <AddNewDestinationModal
          onAdd={(v) => {
            onChange(v);
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
          value={value}
        />
      </ModalTop>
    </div>
  );
};

export default Destinations;

const DestinationsItem = ({ _id, onChange, value }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div className="relative ">
      <Image
        className="w-full h-[19.7rem] object-cover rounded-[.4rem]"
        src={TestImage}
        alt="testingImage"
        errorMessage="Image not found"
        containerClassName="h-[19.7rem]"
      />
      <span className="absolute bottom-[1.6rem] left-[1.4rem] right-[1.4rem] line-clamp-1 text-white text-[2.4rem] font-bold leading-[120%]">
        Title
      </span>
      <button
        className="absolute top-[1.3rem] right-[1.5rem] bg-white/50 text-black text-[2rem] p-[.4rem] grid-center rounded-[.4rem] opacity"
        onClick={() => setIsDeleteModalOpen(true)}
        type="button"
      >
        <CiTrash />
      </button>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onOkay={() => {
          onChange(value.filter((v) => v !== _id));
          setIsDeleteModalOpen(false);
        }}
        deleteItemName="destination"
      />
    </div>
  );
};

const AddNewDestinationModal = ({ value, onClose, onAdd }) => {

  const dispatch = useDispatch();
  const { destinationsData } = useSelector((s) => s.destinationsReducer);
  const navigate = useNavigate();

  const queryParams = ""

  useEffect(() => {
    dispatch(
      getDestinations({
        payload: {
          queryParams,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
    console.log(destinationsData)
  }, [dispatch, navigate, queryParams]);

  const { dirty, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { checkedIds: value || [] },
    enableReinitialize: true,
    onSubmit: (v) => {
      onAdd(v.checkedIds);
    },
  });
  return (
    <div className="grid grid-rows-[auto_1fr] h-[calc(100vh_-_5rem)]">
      <div className="pt-[3.7rem] pb-[3.6rem] grid gap-[3rem] grid-cols-[auto_auto] items-center justify-between h-[11.8rem] sticky top-0 bg-white z-[1301]">
        <h2 className="text-[2.5rem] font-semibold text-black leading-[160%]">
          Destinations
        </h2>

        <MyInput
          type="search-input"
          className="rounded-[.4rem] border border-[#00000014] bg-white"
          placeholder="Search"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 grid-rows-[1fr_auto]"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[1.8rem] content-start">
        {destinationsData.data?.map((destination, i) => (
              <AddNewDestinationModalItem
                img={destination?.img}
                alt="testing"
                title={destination?.title}
                key={i}
                _id={destination?._id}
                onChange={(v) => setFieldValue("checkedIds", v)}
                value={values.checkedIds}
              />
            ))}
        </div>

        <div className="pb-[4.9rem] pt-[5.6rem] grid gap-[3.2rem] justify-start grid-cols-[auto_auto] h-[15.6rem] sticky bottom-0 bg-white z-[1301]">
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

const AddNewDestinationModalItem = ({
  img,
  alt,
  title,
  _id,
  value,
  onChange,
}) => {
  return (
    <label
      htmlFor={_id}
      className="grid grid-cols-1 rounded-[.6rem] overflow-hidden cursor-pointer"
    >
      <Image
        className="w-full aspect-[227/179] object-cover"
        src={img}
        alt={alt}
        errorMessage="Image not found"
      />
      <div className="grid grid-cols-[1fr_auto] gap-[1rem] items-center px-[1.5rem] py-[1.1rem] bg-custom-dark-gren">
        <span className="text-white text-[1.2rem] font-medium leading-[120%] line-clamp-1">
          {title}
        </span>
        <MyInput
          id={_id}
          type="checkbox"
          onChange={(e) =>
            onChange(
              e.target.checked
                ? [...value, _id]
                : value.filter((v) => v !== _id)
            )
          }
          checked={value.includes(_id)}
        />
      </div>
    </label>
  );
};
