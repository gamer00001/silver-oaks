import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddTeacherFields } from "@/constants/forms";
import { ManageTeachersColumns } from "@/constants/table-constants";
import { parseAddStudentData } from "@/parsers/admin-parser";
import {
  MockTeacherStudentsData,
  parseTeachersListing,
} from "@/parsers/student-parser";
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  fetchTeachersListing,
} from "@/store/actions/teacherActions";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageTeachers = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const dispatch = useDispatch();

  const {
    teachersListing: { data, loading },
  } = useSelector((s) => s.teacherReducer);

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

    let parseData = parseAddStudentData(formData);

    if (isEditMode) {
      parseData = {
        ...parseData,
        studentId: selectedRecord.studentId,
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

    dispatch(
      deleteTeacher({
        payload: {
          query: {
            rollNumber: selectedRecord?.rollNumber,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
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

  useEffect(() => {
    fetchListing();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button variant="primary" size="large">
          Upload CSV
        </Button>

        <Button
          size="large"
          variant="secondary"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add Teacher
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField icon="/search-icon.svg" />
        </Grid>

        <Grid item md={3}>
          <Dropdown placeholder="Select Grade" options={options} />
        </Grid>
        <Grid item md={3}>
          <Dropdown placeholder="Campus" options={options} />
        </Grid>
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={ManageTeachersColumns}
          rows={parseTeachersListing(data?.teacherList, handleModal)}
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
          fields={AddTeacherFields()}
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

export default ManageTeachers;
