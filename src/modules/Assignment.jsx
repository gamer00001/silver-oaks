import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getAssignmentById,
  submitAssignmentByStudent,
} from "@/store/actions/assignmentsActions";
import { Loader, ModalTop } from "@/components/common";

const Assignment = ({ forStudent = false }) => {
  const [state, setState] = useState({
    isOpen: false,
    isLoading: false,
    uploadedFile: null,
  });

  const inputFileRef = useRef(null);

  const handleLoader = () => {
    setState((prev) => ({
      ...prev,
      isLoading: !prev.isLoading,
    }));
  };

  const handleModal = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const questions = [
    "Name three machines that we use in our daily life.",
    "Name three machines that run on electricity.",
    "Why is a computer called a smart machine?",
  ];
  const { id, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    singleAssignmentData: { data, loading },
  } = useSelector((s) => s.assignmentReducer);

  const fetchAssignment = () => {
    dispatch(
      getAssignmentById({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            assignmentId: aid,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setState((prev) => ({
      ...prev,
      uploadedFile: file,
    }));
  };

  const handleUploadAssignment = () => {
    handleLoader();

    const {studentId} = JSON.parse(localStorage.getItem("userInfo"))

    const formData = new FormData();

    const obj = {
      assignmentId: data.assignmentId,
      comments: "Pending",
      studentId: studentId,
      description: "dummy",
      submissionDate: moment().format("MM-DD-YYYY"),
      submittedFile: state.uploadedFile,
    };

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(
      submitAssignmentByStudent({
        onSuccess: () => {
          handleLoader();
          handleModal();
          fetchAssignment();
        },
        // onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            queryParams: "",
          },
          body: formData,
          dispatch,
        },
      })
    );
  };

  if (loading || state.isLoading) {
    return <Loader type="screen" />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <h1 className="font-semibold text-[2.5rem]">
            {`Assignment ${data?.assignmentId}: `}&nbsp;
          </h1>
          <h1 className="text-[2.5rem] text-gray-600">
            {aid == 268534685 && id == 268534685
              ? "Scratch"
              : data?.assignmentTitle ?? "N/A"}
          </h1>
        </div>
        <div>
          {forStudent && (
            <h1 className="text-custom-red text-[1.2rem] font-semibold">
              {`Due ${moment(data?.dueDate).format("DD-MMM HH:mm a")}`}
            </h1>
          )}
        </div>
      </div>

      {forStudent ? (
        <SingleAssignmentView
          state={state}
          file={data?.file}
          navigate={navigate}
          uploadFile={uploadFile}
          handleModal={handleModal}
          isModalOpen={state.isOpen}
          inputFileRef={inputFileRef}
          handleUploadAssignment={handleUploadAssignment}
        />
      ) : (
        <div className="flex flex-col w-full p-12 border border-solid border-black rounded-xl mt-4">
          <div className="w-full flex flex-row justify-end">
            <h1 className="text-custom-red text-[1.2rem] font-semibold">
              Hidden from students
            </h1>
          </div>
          {aid == 1 && id == 1 ? (
            <iframe
              src="https://quizandsurveymaster.com/quiz/sample-quiz"
              width="640"
              height="480"
              allow="autoplay"
            ></iframe>
          ) : (
            questions.map((question, i) => (
              <>
                <h1 className="text-[3rem] mt-4">
                  Q{i + 1}:{" " + question}
                </h1>
              </>
            ))
          )}
        </div>
      )}

      {!forStudent && (
        <div className="flex flex-row justify-end m-12">
          <button
            className="bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white text-[2rem] enabled:hover:opacity-70 transition-opacity"
            onClick={() => navigate(`/course/${id}/assignmentSummary/${aid}`)}
          >
            View Submissions
          </button>
        </div>
      )}
    </div>
  );
};

export default Assignment;

const SingleAssignmentView = ({
  file,
  state,
  uploadFile,
  inputFileRef,
  isModalOpen,
  handleModal,
  navigate,
  handleUploadAssignment,
}) => {
  const { id, aid } = useParams();

  return (
    <div className="h-full">
      <div className="pt-10 h-20">
        <span
          onClick={() => window.open(file)}
          className="bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white text-[2rem] enabled:hover:opacity-70 transition-opacity cursor-pointer"
        >
          Open File
        </span>
      </div>

      <div className="p-5 mt-20 border-2 border-black border-opacity-58 rounded-3xl">
        <span className="font-semibold text-[2.5rem]">Your Work:</span>
        <div
          onClick={handleModal}
          className={`bg-[#B6BFE830] rounded-xl text-[#000000B8] text-3xl font-semibold p-5 mt-5 flex gap-5 cursor-pointer`}
        >
          <img src="/download-icon.svg" alt="download-icon" />
          Upload Assignment
        </div>

        {/* <button
          className="mt-10 bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white text-[2rem] enabled:hover:opacity-70 transition-opacity"
          onClick={() => navigate(`/course/${id}/assignmentSummary/${aid}`)}
        >
          Submit
        </button> */}
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={isModalOpen}
        onClose={handleModal}
      >
        <UploadAssignmnet
          state={state}
          uploadFile={uploadFile}
          inputFileRef={inputFileRef}
          handleUploadAssignment={handleUploadAssignment}
          onClose={() => {
            handleModal();
          }}
        />
      </ModalTop>
    </div>
  );
};

const UploadAssignmnet = ({
  state,
  inputFileRef,
  uploadFile,
  onClose,
  handleUploadAssignment,
}) => {
  return (
    <div className="p-52">
      <div className="border-2 border-dashed border-black border-opacity-58 rounded-2xl flex items-center p-10 flex-col">
        <img
          className="w-40"
          src="/upload-file-icon.svg"
          alt="upload-file-icon"
        />

        <span className="italic text-xl text-black">
          Select a file or drag and drop here
        </span>

        <span className="text-[#00000066] italic text-xl mt-3">
          JPG, PNG or PDF, file size no more than 10MB
        </span>

        <button
          className="mt-10 bg-white rounded-[1rem] pl-8 pr-8 pt-4 pb-4 text-[#0F91D2] text-[2rem] enabled:hover:opacity-70 transition-opacity border-2 border-[#0F91D2B2] border-opacity-58 "
          onClick={() => inputFileRef.current.click()}
        >
          Select File
        </button>

        {state?.uploadedFile && (
          <span className="text-[#00000066] text-xl italic mt-10">
            {state.uploadedFile.name}
          </span>
        )}

        <input
          id="fileInput"
          name="fileInput"
          hidden
          ref={inputFileRef}
          type="file"
          accept=".pdf,.docx,.png,.jpg"
          onChange={uploadFile}
        />
      </div>

      <div className="flex justify-end gap-5">
        <button
          className="mt-10 bg-white rounded-[1rem] pl-8 pr-8 pt-4 pb-4 text-black text-[2rem] enabled:hover:opacity-70 transition-opacity border-2 border-black border-opacity-58 "
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`mt-10 bg-white rounded-[1rem] pl-8 pr-8 pt-4 pb-4 text-[#0F91D2] text-[2rem] enabled:hover:opacity-70 transition-opacity border-2 border-[#0F91D2B2] border-opacity-58 ${
            !state?.uploadedFile && "border-[#00000029] text-[#00000029]"
          }`}
          onClick={handleUploadAssignment}
          disabled={state?.uploadedFile ? false : true}
        >
          Upload
        </button>
      </div>
    </div>
  );
};
