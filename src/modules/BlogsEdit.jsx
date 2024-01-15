import { Loader, MyInput } from "@/components/common";
import { CONSTANTS } from "@/constants";
import { blogSchema } from "@/schema";
import { editBlog, getSingleBlog, imageUpload } from "@/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BlogsEdit = () => {
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.2rem] content-start max-w-[1240px]">
          <div className="grid gap-[.56rem]">
            <h1 className="h5-bold text-custom-dark-gren">Edit your blog</h1>
            <p className="body-regular text-custom-dark-gren">
              Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
            </p>
          </div>

          <BlogsForm />
        </div>
      </div>
    </div>
  );
};

export default BlogsEdit;

const BlogsForm = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getSingleBlogData, editBlogData } = useSelector((s) => s.blogReducer);
  const { imageUploadData } = useSelector((s) => s.uploadReducer);

  const {
    values,
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      cover: getSingleBlogData?.data?.cover || null,
      title: getSingleBlogData?.data?.title || "",
      content: getSingleBlogData?.data?.content || "",
      keywords: getSingleBlogData?.data?.keywords || [],
    },
    validationSchema: blogSchema,
    enableReinitialize: true,
    onSubmit: (v) => {
      const body = { ...v };
      const f1 = () =>
        dispatch(
          editBlog({
            payload: {
              body,
              _id: blogId,
            },
            onSuccess: () => {
              toast.success("Successfully updated blog!");
              navigate("/blogs");
            },
          })
        );

      if (typeof body.cover === "string") {
        delete body.cover;
        f1();
      } else
        dispatch(
          imageUpload({
            payload: { images: [body.cover] },
            onSuccess: (data) => {
              body.cover = data.files[0];
              f1();
            },
          })
        );
    },
  });

  useEffect(() => {
    dispatch(
      getSingleBlog({
        payload: { _id: blogId },
        onError: () => navigate("/blogs"),
      })
    );
  }, [blogId, dispatch, navigate]);

  return (
    <form className="grid gap-[3.2rem]" onSubmit={handleSubmit}>
      {(getSingleBlogData?.loading || imageUploadData?.loading) && (
        <Loader type="screen-bg" />
      )}

      <div className="grid gap-[3.2rem]">
        <MyInput
          type="text"
          onChange={handleChange}
          value={values.title}
          error={touched.title && errors.title}
          name="title"
          onBlur={handleBlur}
          placeholder="Enter title"
          label="Title"
        />
        <MyInput
          type="tag"
          onChange={(v) => setFieldValue("keywords", v)}
          value={values.keywords}
          error={touched.keywords && errors.keywords}
          name="keywords"
          onBlur={handleBlur}
          placeholder="Press enter to new keywords"
          label="Keywords"
        />
        <MyInput
          type="file"
          onChange={(v) => setFieldValue("cover", v)}
          value={
            typeof values.cover === "string"
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.cover}`
              : values.cover
          }
          error={touched.cover && errors.cover}
          name="cover"
          accept=".png, .jpeg, .jpg"
          onBlur={handleBlur}
          label="Feature Image"
        />
        <MyInput
          type="text-editor"
          onChange={(v) => setFieldValue("content", v)}
          value={values.content}
          error={touched.content && errors.content}
          name="content"
          label="Content"
          onBlur={handleBlur}
          placeholder="Write blog description here"
        />
      </div>

      <div className="grid items-center justify-end grid-cols-[auto]">
        <button
          className="relative overflow-hidden px-[11.4rem] py-[1.9rem] bg-custom-button-color button text-custom-dark-gren opacity-button rounded-[.8rem] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!dirty}
          type="submit"
        >
          {editBlogData?.loading && <Loader type="button" />}
          Update
        </button>
      </div>
    </form>
  );
};
