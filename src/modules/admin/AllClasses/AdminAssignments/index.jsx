import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddTeacherFields } from "@/constants/forms";
import { AssignmentsColumns } from "@/constants/table-constants";
import { parseAddTeacherData } from "@/parsers/admin-parser";
import { MockAssignmentData } from "@/parsers/student-parser";
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  fetchTeachersListing,
} from "@/store/actions/teacherActions";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const AdminAssignments = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { courseName, courseId, gradeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    teachersListing: { data, loading },
  } = useSelector((s) => s.teacherReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  console.log({ campusesData });

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
          console.log({ resp });
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const handleDeleteUser = () => {
    const { selectedRecord } = state;

    console.log({ selectedRecord }, selectedRecord?.selectedRecord?.teacherId);

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
      fetchTeachersListing({
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

  const handleViewSubmission = (assignmentId = 1) => {
    navigate(`${1}`);
  };

  useEffect(() => {
    fetchListing();

    // fetchCompusListing(dispatch);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="secondary"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add New Lecture
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
          rows={MockAssignmentData(handleModal, handleViewSubmission)}
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
          handleAction={handleDeleteUser}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default AdminAssignments;
