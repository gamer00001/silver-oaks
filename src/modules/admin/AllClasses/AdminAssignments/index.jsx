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
  getAssignmentsByCourseId,
} from "@/store/actions/assignmentsActions";
import {
  deleteTeacher,
  fetchAllTeachers,
} from "@/store/actions/teacherActions";
import { removeEmptyValues } from "@/utils/helper";
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

  const handleAdd = (formData) => {
    const { isEditMode, selectedRecord } = state;

    handleLoader(true);

    let parseData = {
      courseId,
      section: sectionId,
      // section: sectionName,
      term: formData?.term,
      totalMarks: formData.totalMarks,
      dueDate: formData?.dueDate,
      file: !isEmpty(formData?.file) ? formData?.file[0] : "",
      // file: formData.file[0],
      teacherId: data.teacherList.find(
        (item) => item.employeeName === formData.teacher
      )?.teacherId,
      visibility: true,
      assignmentTitle: formData.assignmentTitle,
    };

    if (isEditMode) {
      parseData = {
        ...parseData,
        assignmentId: selectedRecord.assignmentId,
      };
    }

    console.log({ parseData }, removeEmptyValues(parseData));

    dispatch(
      createAssignment({
        payload: {
          body: removeEmptyValues(parseData),
        },
        onError: () => {
          toast.error("Something went wrong");
          handleLoader(false);
        },
        onSuccess: () => {
          fetchListing();
          handleLoader(false);
          // handleModal("addNewModalIsOpen");
          toast.success("Assignment Created Successfully!");
        },
      })
    );

    // const apiToCall = isEditMode ? editTeacher : addTeacher;

    // dispatch(
    //   apiToCall({
    //     payload: {
    //       body: parseData,
    //     },
    //     onSuccess: (resp) => {
    //       console.log({ resp });
    //       fetchListing();
    //     },
    //     onError: () => navigate("/404", { replace: true }),
    //   })
    // );
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
    navigate(`${1}`);
  };

  useEffect(() => {
    fetchListing();
    fetchListingForTeacher();

    // fetchCompusListing(dispatch);
  }, []);

  console.log({ assignmentsData });

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
          <InputField icon="/search-icon.svg" />
        </Grid>
        <Grid item md={3} />

        <Grid item md={3}>
          <Dropdown placeholder="Published Date" options={options} />
        </Grid>
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
          teachersList={data?.teacherList?.map((item) => item?.employeeName)}
          fields={AddAssignmentFields(campusesData?.data) ?? []}
          handleAdd={handleAdd}
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

export default AdminAssignments;
