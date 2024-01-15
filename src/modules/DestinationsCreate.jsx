import { FeatureTour } from "@/components/DestinationsCreate";
import { Link, Loader, MyInput } from "@/components/common";
import { destinationSchema } from "@/schema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addDestinations } from "@/store/actions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "@/store";

const DestinationsCreate = () => {
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.3rem] content-start max-w-[1240px]">
          <h1 className="text-black text-[2.5rem] font-semibold leading-[160%]">
            Add Destination
          </h1>

          <DestinationsForm />
        </div>
      </div>
    </div>
  );
};

export default DestinationsCreate;

const DestinationsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createDestinationsData } = useSelector((s) => s.destinationsReducer);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      img: null,
      featuredTour: null,
      featureTourDetails: null,
    },
    enableReinitialize: true,
    validationSchema: destinationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (v) => {
      const c = { ...v };
      console.log(c);
      dispatch(
        imageUpload({
          payload: { images: [c.img] },
          onSuccess: ({ files: [img] }) => {
            c.img = img;
            console.log(c)
            dispatch(
              addDestinations({
                payload: {
                  data: c,
                },
                onError: () => toast.error("Unable to Add Destination!"),
                onSuccess: () => {
                  navigate("/destinations", { replace: true });
                  toast.success("Destination Added Successfully!");
                },
              })
            );
          },
        })
      );
    },
  });
  return createDestinationsData?.loading ? (
    <Loader
      type="button"
      className="!bg-[#FFFFFF]"
      secondaryColor="#F4D06F"
      color="#fdbb05"
    />
  ) : (
    <form className="grid gap-[8.1rem]" onSubmit={handleSubmit}>
      <div className="grid gap-[3.2rem]">
        <MyInput
          value={values.title}
          label="Title"
          error={touched.title && errors.title}
          onChange={handleChange}
          onBlur={handleBlur}
          name="title"
          type="text"
        />

        <MyInput
          type="file"
          value={values.img}
          label="Feature Image"
          error={touched.img && errors.img}
          onChange={(v) => setFieldValue("img", v)}
          onBlur={handleBlur}
          name="img"
          accept=".png, .jpeg, .jpg"
        />

        <FeatureTour
          value={values.featureTourDetails}
          onChange={(v) => {
            setFieldValue("featuredTour", v?._id || "");
            setFieldValue("featureTourDetails",   v);
            setFieldValue("featureTourName",   v.title);
          }}
          error={touched.featuredTour && errors.featuredTour}
        />
      </div>

      <div className="grid px-[9rem] sm:grid-cols-2 gap-[1rem] sm:gap-[3.2rem]">
        <button
          type="submit"
          className="button !font-semibold grid-center text-center border border-custom-button-color bg-custom-button-color text-custom-dark-gren py-[1.3rem] rounded-[.8rem] opacity-button disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!dirty}
        >
          Add Destination
        </button>
        <Link
          to="/destinations"
          className="button !font-semibold grid-center text-center border border-custom-dark-gren/40 bg-transparent text-custom-dark-gren py-[1.3rem] rounded-[.8rem] opacity"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};
