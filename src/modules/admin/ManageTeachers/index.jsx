import { ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddTeacherFields } from "@/constants/forms";
import { ManageTeachersColumns } from "@/constants/table-constants";
import { MockTeacherStudentsData } from "@/parsers/student-parser";
import { Grid } from "@mui/material";
import { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageTeachers = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
  });

  const handleModal = (key = "deleteModalIsOpen") => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
          rows={MockTeacherStudentsData(handleModal)}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddStudentTeacher
          title="Add Teacher"
          subtitle="Teacher Details"
          fields={AddTeacherFields()}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default ManageTeachers;
