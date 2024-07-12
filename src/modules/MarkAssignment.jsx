import { Loader, MyInput } from "@/components/common";
import { toast } from "@/utils";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { MarkAssignment as MarkingSchema } from "@/schema";
import ResetIcon from "@/assets/Icons/ResetIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignmentById,
  getAssignmentSubmission,
  markAssignment,
} from "@/store/actions/assignmentsActions";
import { useNavigate, useParams } from "react-router-dom";

const MarkAssignment = () => {
  const navigate = useNavigate();

  const {
    submissionData: { data, loading },
  } = useSelector((s) => s.assignmentReducer);

  const { id, sid, aid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAssignmentSubmission({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            assignmentId: aid,
            studentId: sid,
          },
          dispatch,
        },
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-16 px-10">
      <div className="flex flex-row gap-2 justify-start items-center">
        <h1 className="font-semibold text-[2.5rem]">Assignment 01:</h1>
        <h1 className="text-[2.5rem] text-gray-600">
          ICT and Emerging Technologies
        </h1>
      </div>
      {loading ? <Loader type={"screen"} /> : <MarkingComponent />}
    </div>
  );
};

const MarkingComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    submissionData: { data, loading },
  } = useSelector((s) => s.assignmentReducer);

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
    initialValues: {
      name: data?.studentName,
      feedback: data?.comments === "pending" ? "" : data?.comments,
      marks: data?.obtainedMarks === -1 ? "" : data?.obtainedMarks,
      submissionId: data?.submissionId,
    },
    validationSchema: MarkingSchema,
    onSubmit: (v) => {
      dispatch(
        markAssignment({
          onError: () => toast.error("Some error occured"),
          onSuccess: () => {
            toast.success("Update successfully!");
            navigate(-1);
          },
          payload: {
            body: v,
            dispatch,
          },
        })
      );
    },
  });

  return (
    <>
      {loading && <Loader type="screen" />}
      <div className="grid gap-[3.6rem]">
        <form onSubmit={handleSubmit} className="grid gap-[7.7rem]">
          <div className="flex flex-col gap-x-[2.1rem] gap-y-[1.6rem]">
            <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
              <div>
                <h1 className="body-medium h5">Student name: </h1>
              </div>
              <div>
                <MyInput
                  type="text"
                  placeholder="Enter Student Name"
                  className="col-span-1 sm:col-span-6"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  name="name"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
              <div>
                <h1 className="body-medium h5">Marks: </h1>
              </div>
              <div>
                <MyInput
                  type="text"
                  placeholder="Enter Student Marks"
                  className="col-span-1 sm:col-span-6"
                  value={values.marks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.marks && errors.marks}
                  name="marks"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
              <div>
                <h1 className="body-medium h5">Feedback</h1>
              </div>
              <div>
                <MyInput
                  type="textarea"
                  placeholder="Add feedback"
                  className="col-span-12"
                  value={values.feedback}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.feedback && errors.feedback}
                  name="feedback"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-[3.2rem] justify-end grid-cols-[auto_auto_auto] items-center">
            <div
              className="hover:opacity-70 cursor-pointer"
              onClick={() => {
                setFieldValue("feedback", "");
                setFieldValue("marks", "");
              }}
            >
              <ResetIcon />
            </div>
            <button
              className="p-[1.3rem_6.3rem] text-custom-red button opacity-button border bg-white rounded-[2.8rem] border-custom-red disabled:opacity-50"
              onClick={() => window.open(data?.submittedFileURL)}
              disabled={!dirty}
            >
              View Assignment
            </button>
            <button
              className="p-[1.3rem_6.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
              type="submit"
              disabled={!dirty}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MarkAssignment;
