import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddNewAssignment from "@/components/modals/AddNewAssignment";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddAssignmentFields } from "@/constants/forms";
import { AssignmentsColumns } from "@/constants/table-constants";
import { parseAssignmentListing } from "@/parsers/student-parser";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentsByCourseId,
  updateAssignment,
} from "@/store/actions/assignmentsActions";
import { fetchAllTeachers } from "@/store/actions/teacherActions";
import { handleError } from "@/utils/errorHandling";
import { fetchFileFromUrl, removeEmptyValues } from "@/utils/helper";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const initialValues = {
  assignmentTitle: "",
  description: "",
  section: "",
  term: "",
  dueDate: null,
  totalMarks: null,
  teacher: "",
};

const AdminAssignments = () => {
  const [state, setState] = useState({
    isLoading: false,
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { courseName, courseId, gradeId, sectionId, sectionName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    allTeachersListing: { data, loading },
  } = useSelector((s) => s.teacherReducer);

  const { assignmentsData } = useSelector((s) => s.assignmentReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

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

  const handleAdd = async (formData) => {
    const { isEditMode, selectedRecord } = state;

    handleLoader(true);

    let parseData = {
      courseId,
      section: sectionId,
      description: formData.description,
      // section: sectionName,
      term: formData?.term,
      totalMarks: formData.totalMarks,
      dueDate: formData?.dueDate,
      file: !isEmpty(formData?.file) ? formData?.file[0] : "",
      // file: formData.file[0],
      teacherId: data.teacherCompleteList.find(
        (item) => item.employeeName === formData.teacher
      )?.teacherId,
      visibility: true,
      assignmentTitle: formData.assignmentTitle,
    };

    const oldFile = selectedRecord?.file
      ? await fetchFileFromUrl(selectedRecord?.file)
      : "";

    if (isEditMode) {
      parseData = {
        ...parseData,
        file: formData.file[0] instanceof File ? formData.file[0] : oldFile,
        assignmentId: selectedRecord?.assignmentId,
      };
    }

    const apiToCall = isEditMode ? updateAssignment : createAssignment;

    dispatch(
      apiToCall({
        payload: {
          body: removeEmptyValues(parseData),
        },
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        onSuccess: () => {
          fetchListing();
          handleLoader(false);
          // handleModal("addNewModalIsOpen");
          toast.success(
            `Assignment ${isEditMode ? "Updated" : "Created"} Successfully!`
          );
        },
      })
    );
  };

  const fetchListingForTeacher = () => {
    dispatch(
      fetchAllTeachers({
        payload: {
          query: {
            page: 0,
            size: 500,
          },
          dispatch,
        },
      })
    );
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    dispatch(
      deleteAssignment({
        payload: {
          query: {
            assignmentId: selectedRecord?.assignmentId,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          toast.success("Deleted Successfully!");
          fetchListing();
        },
        onError: () => {
          console.log({ error });
          return toast.error("Some Error Occured!");
        },
      })
    );
  };

  const fetchListing = () => {
    dispatch(
      getAssignmentsByCourseId({
        onError: (error) => {
          console.log({ error });
          // toast.error("Some Error Occured!");
        },
        payload: {
          query: {
            courseId,
            section: sectionId,
          },
          dispatch,
        },
      })
    );
  };

  const handleViewSubmission = (assignmentId = 1) => {
    navigate(`${assignmentId}`);
  };

  useEffect(() => {
    fetchListing();
    fetchListingForTeacher();

    // fetchCompusListing(dispatch);
  }, []);

  if (assignmentsData.loading || state.isLoading) {
    return <Loader type={"screen"} />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="secondary"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add New Assignment
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          {/* <InputField icon="/search-icon.svg" /> */}
        </Grid>
        <Grid item md={3} />

        {/* <Grid item md={3}>
          <Dropdown placeholder="Published Date" options={options} />
        </Grid> */}
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={AssignmentsColumns}
          rows={parseAssignmentListing(
            assignmentsData?.data?.assignmentList,
            handleModal,
            handleViewSubmission
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddNewAssignment
          title={state.isEditMode ? "Edit Assignment" : "Add Assignment"}
          subtitle="Assignment Details"
          initialValues={initialValues}
          teachersList={data?.teacherCompleteList?.map(
            (item) => item?.employeeName
          )}
          fields={AddAssignmentFields(campusesData?.data) ?? []}
          handleAdd={handleAdd}
          editValues={
            state.selectedRecord
              ? {
                  ...state.selectedRecord,
                  file: [state?.selectedRecord?.file],
                }
              : null
          }
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

export default AdminAssignments;
