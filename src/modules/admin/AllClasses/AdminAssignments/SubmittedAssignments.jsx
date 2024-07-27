import { Loader, ModalTop } from "@/components/common";
import CustomTable from "@/components/common/CustomTable";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddTeacherFields } from "@/constants/forms";
import { SubmittedAssignmentColumns } from "@/constants/table-constants";
import { parseAddTeacherData } from "@/parsers/admin-parser";
import { parseSubmittedAssignmentListing } from "@/parsers/student-parser";
import {
  getAssignmentById,
  getAssignmentSubmissions,
} from "@/store/actions/assignmentsActions";
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
} from "@/store/actions/teacherActions";
import { handleError } from "@/utils/errorHandling";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SubmittedAssignments = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    page: 0,
    size: 10,
    totalPages: 1,
    selectedRecord: {},
    assignmentDetails: {},
    isEditMode: false,
    submittedAssignments: [],
  });

  const { assignmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const { assignmentSubmissionsData } = useSelector((s) => s.assignmentReducer);

  const {
    teachersListing: { data, loading },
  } = useSelector((s) => s.teacherReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  const handleModal = (
    key = "deleteModalIsOpen",
    selectedRecord,
    isEditMode = false
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
      isEditMode,
      selectedRecord: selectedRecord,
    }));
  };

  const handleAddUser = (formData) => {
    const { isEditMode, selectedRecord } = state;

    let parseData = parseAddTeacherData(formData);

    if (isEditMode) {
      parseData = {
        ...parseData,
        teacherId: selectedRecord.teacherId,
      };
    }

    const apiToCall = isEditMode ? editTeacher : addTeacher;

    dispatch(
      apiToCall({
        payload: {
          body: parseData,
        },
        onSuccess: (resp) => {
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    dispatch(
      deleteTeacher({
        payload: {
          query: {
            teacherId: selectedRecord?.teacherId,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          toast.success("Deleted Successfully!");
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const fetchListing = () => {
    const { page, size } = state;
    const queryPage = search.split("=")[1];

    dispatch(
      getAssignmentSubmissions({
        payload: {
          query: {
            assigmentId: assignmentId,
            page: queryPage ? queryPage - 1 : page,
            size,
          },
          dispatch,
        },
        onSuccess: (resp) => {
          setState((prev) => ({
            ...prev,
            page: resp?.assignmentSubmissionResponsePage.number,
            totalPages: resp?.assignmentSubmissionResponsePage.totalPages,
            submittedAssignments:
              resp?.assignmentSubmissionResponsePage?.content ?? [],
          }));
        },
      })
    );
  };

  const fetchAssignmentById = () => {
    dispatch(
      getAssignmentById({
        onSuccess: (resp) => {
          setState((prev) => ({
            ...prev,
            assignmentDetails: resp,
          }));
        },
        onError: (error) => handleError(error),
        payload: {
          query: {
            assignmentId: assignmentId,
          },
          dispatch,
        },
      })
    );
  };

  const handleViewSubmission = (assignmentId = 1) => {
    navigate(`${1}`);
  };

  const handleMarkAssignment = (studentRollNumber) => {
    navigate(`student/${studentRollNumber}`);
  };

  useEffect(() => {
    fetchListing();

    // fetchCompusListing(dispatch);
  }, [search]);

  useEffect(() => {
    fetchAssignmentById();
  }, []);

  if (assignmentSubmissionsData.loading) {
    return <Loader type="screen" />;
  }

  return (
    <div className="bg-white h-full">
      <div className="p-12">
        <div className="flex">
          <img
            src="/back-icon.svg"
            className="pr-4 cursor-pointer"
            alt="back-icon"
            onClick={() => navigate(-1)}
          />
          <span className="text-5xl font-semibold">
            Assignment {state.assignmentDetails?.assignmentId ?? "N/A"} &nbsp;
          </span>
          <span className="text-[#161736A3] text-5xl font-semibold">
            {state.assignmentDetails?.assignmentTitle ?? "N/A"}
          </span>
        </div>

        <div className="italic pt-6 text-2xl pl-16">{`Total Marks: ${
          state.assignmentDetails?.totalMarks ?? "N/A"
        }`}</div>
      </div>

      <div className="p-12">
        <CustomTable
          page={state.page + 1}
          totalPages={state.totalPages}
          columns={SubmittedAssignmentColumns}
          rows={parseSubmittedAssignmentListing(
            state?.submittedAssignments ?? [],
            handleMarkAssignment
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddStudentTeacher
          title={state.isEditMode ? "Edit Teacher" : "Add Teacher"}
          subtitle="Teacher Details"
          fields={AddTeacherFields(campusesData?.data) ?? []}
          handleAddUser={handleAddUser}
          editValues={state.selectedRecord}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleAction={handleDelete}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default SubmittedAssignments;
