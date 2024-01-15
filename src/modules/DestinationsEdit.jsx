import { FeatureTour } from "@/components/DestinationsCreate";
import { Link, Loader, MyInput } from "@/components/common";
import { CONSTANTS } from "@/constants";
import { destinationSchema } from "@/schema";
import { imageUpload } from "@/store";
import { editDestinations, getDestination, getTour } from "@/store/actions";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DestinationsEdit = () => {
  const { destinationId } = useParams();
  const dispatch = useDispatch();
  const { destinationData } = useSelector((s) => s.destinationsReducer);

  const navigate = useNavigate();

  const queryParams = destinationId;

  useEffect(() => {
    dispatch(
      getDestination({
        payload: {
          queryParams,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
    console.log(destinationData);
  }, [dispatch, navigate, queryParams]);


  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.3rem] content-start max-w-[1240px]">
          <h1 className="text-black text-[2.5rem] font-semibold leading-[160%]">
            Edit Destination
          </h1>
          {destinationData?.loading ? (
            <Loader type="screen-bg" />
          ) : (
            <DestinationsForm destinationData={destinationData}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationsEdit;

const DestinationsForm = ({ destinationData }) => {
  const dispatch = useDispatch();
  const { editDestinationData } = useSelector((s) => s.destinationsReducer);
  const navigate = useNavigate();
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
      title: destinationData?.data?.title || "",
      img: destinationData?.data?.img || null,
      featuredTour: destinationData?.data?.featureTour || null,
      featureTourDetails: destinationData?.data?.featureTourDetails || null,
    },
    validationSchema: destinationSchema,
    enableReinitialize: true,
    
    onSubmit: (v) => {
      const c = { ...v };
      c.id = destinationData?.data?._id;
      if (typeof c.img === "string") {
        delete c.img;
        dispatch(
          editDestinations({
            payload: {
              data: c,
            },
            onError: () => toast.error("Unable to Edit Destination!"),
            onSuccess: () => {
              navigate("/destinations", { replace: true });
              toast.success("Destination Edited Successfully!");
            },
          })
        );
      }
      else{
      dispatch(
        imageUpload({
          payload: { images: [c.img] },
          onSuccess: ({ files: [img] }) => {
            c.img = img;
            console.log(c)
            dispatch(
              editDestinations({
                payload: {
                  data: c,
                },
                onError: () => toast.error("Unable to Edit Destination!"),
                onSuccess: () => {
                  navigate("/destinations", { replace: true });
                  toast.success("Destination Edited Successfully!");
                },
              })
            );
          },
        })
      );
      }
      
    },
  });
  useEffect(()=>{
    setFieldValue("featuredTour", destinationData?.data?.featureTourDetails._id);
    setFieldValue("featureTourDetails", destinationData?.data?.featureTourDetails)
  }, [destinationData]);

  console.log(values)
  return (
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
          value={typeof values.img === "string"
          ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.img}`
          : values.img}
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
            setFieldValue("featureTourDetails", v);
          }}
          tour={values.featureTourDetails}
          error={touched.featureTourDetails && errors.featureTourDetails}
        />
      </div>

      <div className="grid px-[9rem] sm:grid-cols-2 gap-[1rem] sm:gap-[3.2rem]">
        <button
          type="submit"
          className="button !font-semibold grid-center text-center border border-custom-button-color bg-custom-button-color text-custom-dark-gren py-[1.3rem] rounded-[.8rem] opacity-button disabled:opacity-50 disabled:cursor-not-allowed"
          // disabled={!dirty}
        > 
          Update Destination
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
