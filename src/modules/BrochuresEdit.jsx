import { PDFImage } from "@/assets/common";
import { Loader, MyInput } from "@/components/common";
import { CONSTANTS } from "@/constants";
import { BrochureSchema } from "@/schema";
import { fileUpload, imageUpload } from "@/store";
import { editBrochure, getBrochure } from "@/store/actions/brouchureActions";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const BrochuresEdit = () => {
  const { brochureId } = useParams();
  const dispatch = useDispatch();
  const { brochureData, editBrochureData } = useSelector(
    (s) => s.brochuresReducer
  );
  const navigate = useNavigate();

  const queryParams = brochureId;
  console.log(queryParams)
  useEffect(() => {
    dispatch(
      getBrochure({
        payload: {
          queryParams,
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, queryParams]);

  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.2rem] content-start max-w-[1240px]">
          <div className="grid gap-[1.6rem]">
            <h1 className="h5-bold text-custom-dark-gren">Edit Download</h1>
            <p className="body-regular text-custom-dark-gren">
              Offer some useful tips and advice for visitors to the Falcon Club
              Tourist page
            </p>
          </div>
          {brochureData?.loading ? (
            <Loader type="screen-bg" />
          ) : (
            <BrochuresForm brochureData={brochureData}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrochuresEdit;

const BrochuresForm = ({brochureData}) => {
  const { brochureId } = useParams();
  const dispatch = useDispatch();
  const { editBrochureData } = useSelector((s) => s.brochuresReducer);
  const navigate = useNavigate();
  const {
    values,
    dirty,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      cover: brochureData.data?.cover || null,
      title: brochureData.data?.title || "",
      description: brochureData.data?.description || "",
      broucherFile: brochureData.data?.brochureFile || null,
    },
    enableReinitialize: true,
    validationSchema: BrochureSchema,
    onSubmit: (v) => {
      console.log(v);

      const update = (data) =>{
        data.id = brochureData.data?._id;
        dispatch(
          editBrochure({
            payload: { data: data },
            onSuccess: () => {
              navigate("/downloads");
              toast.success("Successfully Edited!");
            },
          })
        );
      }
      if (typeof v.cover === "string" && typeof v.broucherFile === "string") {
        delete v.cover;
        delete v.broucherFile;
        update(v);
      } 
      else if(typeof v.cover === "string" && typeof v.broucherFile !== "string"){
        delete v.cover;
        dispatch(
          fileUpload({
            payload: { files: [v.broucherFile] },
            onSuccess: ({ files: [brochureFile] }) => {
              v.broucherFile = brochureFile;
              update(v);
            },
          })
        );
      }
      else if(typeof v.cover !== "string" && typeof v.broucherFile === "string"){
        delete v.broucherFile;
        dispatch(
          imageUpload({
            payload: { images: [v.cover] },
            onSuccess: ({ files: [cover] }) => {
              v.cover = cover;
              update(v);
            },
          })
        );
      }
      else if(typeof v.cover !== "string" && typeof v.broucherFile !== "string"){
        dispatch(
          imageUpload({
            payload: { images: [v.cover] },
            onSuccess: ({ files: [cover] }) => {
              dispatch(
                fileUpload({
                  payload: { files: [v.broucherFile] },
                  onSuccess: ({ files: [brochureFile] }) => {
                    v.cover = cover;
                    v.broucherFile = brochureFile;
                    update(v);
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
    setFieldValue("cover", brochureData.data?.cover)
    setFieldValue("broucherFile", brochureData.data?.broucherFile)
  }, [brochureData]);
  return (
    <form className="grid gap-[8.8rem]" onSubmit={handleSubmit}>
      <div className="grid gap-[4.2rem]">
        <Link to={`${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.cover}`}>
        <MyInput
          type="file"
          value={typeof values.cover === "string"
          ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.cover}`
          : values.cover}
          label="Feature Image"
          accept=".jpeg, .jpg, .png"
          onChange={(v) => setFieldValue("cover", v)}
          onBlur={handleBlur}
          name="cover"
          error={touched.cover && errors.cover}
        />
        </Link>
        <MyInput
          type="text"
          value={values.title}
          label="Title"
          onChange={handleChange}
          onBlur={handleBlur}
          name="title"
          error={touched.title && errors.title}
          placeholder="Enter title for download"
        />
        <MyInput
          type="textarea"
          value={values.description}
          label="Description"
          onChange={handleChange}
          onBlur={handleBlur}
          name="description"
          error={touched.description && errors.description}
          placeholder="Enter description for download"
        />
        <Link to={`${CONSTANTS.VITE_BACKEND_STATIC_URL_FOR_FILE}/${brochureData?.data?.broucherFile}`}>
        <MyInput
          label="Itinerary File"
          type="file"
          value={ `${CONSTANTS.VITE_BACKEND_STATIC_URL_FOR_FILE}/${brochureData?.data?.broucherFile}`
           && PDFImage}
          onChange={(v) => setFieldValue("broucherFile", v)}
          error={touched.broucherFile && errors.broucherFile}
          id="broucherFile"
          accept=".pdf"
          selectButtonText="Select PDF"
        />
        </Link>
      </div>
      <div>
        <button
          type="submit"
          disabled={!dirty}
          className="px-[13.8rem] py-[2.3rem] rounded-[.8rem] bg-custom-dark-gren opacity-button text-custom-button-color text-[1.75rem] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update
        </button>
      </div>
    </form>
  );
};
