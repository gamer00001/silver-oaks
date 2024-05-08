import { ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import GradeBlock from "@/components/common/GradeBlock";
import AddNewClass from "@/components/modals/AddNewClass";
import { Grid } from "@mui/material";
import React, { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const MOCK_GRADES = [
  {
    id: 1,
    title: "Grade 1 (Alliums)",
    subtitle: "Campus 1_Faraz(Rawalpindi)",
  },
  {
    id: 2,
    title: "Grade 2 (Alliums)",
    subtitle: "Campus 2_Faraz(Rawalpindi)",
  },
  {
    id: 3,
    title: "Grade 3 (Alliums)",
    subtitle: "Campus 3_Faraz(Rawalpindi)",
  },
  {
    id: 4,
    title: "Grade 4 (Alliums)",
    subtitle: "Campus 4_Faraz(Rawalpindi)",
  },
  {
    id: 5,
    title: "Grade 5 (Alliums)",
    subtitle: "Campus 5_Faraz(Rawalpindi)",
  },
];

const AllClasses = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
  });

  const handleModal = (key = "deleteModalIsOpen") => {
    console.log({ key }, [key], !state[key]);
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white h-full">
      <Grid container spacing={4} className="px-12 py-12">
        <Grid item sm={3} md={3} lg={2}>
          <Dropdown placeholder="Select Grade" options={options} />
        </Grid>
        <Grid item sm={3} md={3} lg={2}>
          <Dropdown placeholder="Campus" options={options} />
        </Grid>
        <Grid item sm={3} md={2} lg={4} />

        <Grid item sm={3} md={4} lg={4} className="flex justify-end gap-8">
          <Button variant="primary" size="large">
            Search
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() => handleModal("addNewModalIsOpen")}
          >
            Add New
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6} className="p-12 flex">
        {MOCK_GRADES.map((grade) => (
          <Grid item lg={4} key={grade.id}>
            <GradeBlock {...grade} />
          </Grid>
        ))}
      </Grid>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddNewClass
          //   fields={AddStudentFields()}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default AllClasses;
