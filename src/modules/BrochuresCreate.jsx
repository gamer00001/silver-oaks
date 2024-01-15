import { PDFImage } from "@/assets/common";
import { MyInput } from "@/components/common";
import { BrochureSchema } from "@/schema";
import { fileUpload, imageUpload } from "@/store";
import { addBrochure } from "@/store/actions/brouchureActions";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BrochuresCreate = () => {
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.2rem] content-start max-w-[1240px]">
          <div className="grid gap-[1.6rem]">
            <h1 className="h5-bold text-custom-dark-gren">Create Downloads</h1>
            <p className="body-regular text-custom-dark-gren">
              Offer some useful tips and advice for visitors to the Falcon Club
              Tourist page
            </p>
          </div>

          <BrochuresForm />
        </div>
      </div>
    </div>
  );
};

export default BrochuresCreate;

const BrochuresForm = () => {
  const dispatch = useDispatch();
  const { createBrochuresData } = useSelector((s) => s.brochuresReducer);
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
      cover: null,
      title: "",
      description: "",
      broucherFile: null,
    },
    enableReinitialize: true,
    validationSchema: BrochureSchema,
    onSubmit: (v) => {
      console.log(v);
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
                  dispatch(
                    addBrochure({
                      payload: { data: v },
                      onSuccess: () => {
                        navigate("/downloads");
                        toast.success("Successfully created!");
                      },
                    })
                  );
                },
              })
            );
          },
        })
      );
    },
  });
  return (
    <form className="grid gap-[8.8rem]" onSubmit={handleSubmit}>
      <div className="grid gap-[4.2rem]">
        <MyInput
          type="file"
          value={values.cover}
          label="Feature Image"
          accept=".jpeg, .jpg, .png"
          onChange={(v) => setFieldValue("cover", v)}
          onBlur={handleBlur}
          name="cover"
          error={touched.cover && errors.cover}
        />
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
        <MyInput
          label="Itinerary File"
          type="file"
          value={values.broucherFile && PDFImage}
          onChange={(v) => setFieldValue("broucherFile", v)}
          error={touched.broucherFile && errors.broucherFile}
          id="broucherFile"
          accept=".pdf"
          selectButtonText="Select PDF"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={!dirty}
          className="px-[13.8rem] py-[2.3rem] rounded-[.8rem] bg-custom-dark-gren opacity-button text-custom-button-color text-[1.75rem] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Publish
        </button>
      </div>
    </form>
  );
};
