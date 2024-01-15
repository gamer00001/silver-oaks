import { Loader, MyInput } from "@/components/common";
import { blogSchema } from "@/schema";
import { createBlog, imageUpload } from "@/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogsCreate = () => {
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.2rem] content-start max-w-[1240px]">
          <div className="grid gap-[.56rem]">
            <h1 className="h5-bold text-custom-dark-gren">
              Add your blog here
            </h1>
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

export default BlogsCreate;

const BlogsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createBlogData } = useSelector((s) => s.blogReducer);
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
      cover: null,
      title: "",
      content: "",
      keywords: [],
    },
    validationSchema: blogSchema,

    onSubmit: (body) => {
      dispatch(
        imageUpload({
          payload: { images: [body.cover] },
          onSuccess: ({ files: [cover] }) => {
            body.cover = cover;
            dispatch(
              createBlog({
                payload: { body },
                onSuccess: () => {
                  navigate("/blogs");
                  toast.success("Successfully created!");
                },
              })
            );
          },
        })
      );
    },
  });
  return (
    <form className="grid gap-[3.2rem]" onSubmit={handleSubmit}>
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
          value={values.cover}
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
          disabled={
            !dirty || createBlogData?.loading || imageUploadData?.loading
          }
          type="submit"
        >
          {(createBlogData?.loading || imageUploadData?.loading) && (
            <Loader type="button" />
          )}
          Publish
        </button>
      </div>
    </form>
  );
};
