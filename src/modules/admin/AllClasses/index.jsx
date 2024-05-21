import { ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import GradeBlock from "@/components/common/GradeBlock";
import AddNewClass from "@/components/modals/AddNewClass";
import { Grid } from "@mui/material";
import React, { useState } from "react";

import garde1 from "../../../assets/common/grade1.png";
import garde2 from "../../../assets/common/grade2.png";
import garde3 from "../../../assets/common/grade3.png";
import garde4 from "../../../assets/common/grade4.png";
import garde5 from "../../../assets/common/grade5.png";
import garde6 from "../../../assets/common/grade6.png";
import garde7 from "../../../assets/common/grade7.png";
import garde8 from "../../../assets/common/grade8.png";
import garde9 from "../../../assets/common/grade9.png";
import garde10 from "../../../assets/common/grade10.png";
import { useNavigate } from "react-router-dom";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const MOCK_GRADES = [
  {
    id: 1,
    title: "Grade I",
    subtitle: "Campus 1_Faraz(Rawalpindi)",
    image: garde1,
    route: "/all-classes/grade/I",
  },
  {
    id: 2,
    title: "Grade II",
    subtitle: "Campus 2_Faraz(Rawalpindi)",
    image: garde2,
    route: "/all-classes/grade/II",
  },
  {
    id: 3,
    title: "Grade III",
    subtitle: "Campus 3_Faraz(Rawalpindi)",
    image: garde3,
    route: "/all-classes/grade/III",
  },
  {
    id: 4,
    title: "Grade IV",
    subtitle: "Campus 4_Faraz(Rawalpindi)",
    image: garde4,
    route: "/all-classes/grade/IV",
  },
  {
    id: 5,
    title: "Grade V",
    image: garde5,
    subtitle: "Campus 5_Faraz(Rawalpindi)",
    route: "/all-classes/grade/V",
  },

  {
    id: 6,
    title: "Grade VI",
    image: garde6,
    subtitle: "Campus 1_Faraz(Rawalpindi)",
    route: "/all-classes/grade/VI",
  },
  {
    id: 7,
    title: "Grade VII",
    image: garde7,
    subtitle: "Campus 2_Faraz(Rawalpindi)",
    route: "/all-classes/grade/VII",
  },
  {
    id: 8,
    title: "Grade VIII",
    image: garde8,
    subtitle: "Campus 3_Faraz(Rawalpindi)",
    route: "/all-classes/grade/VIII",
  },
  {
    id: 9,
    title: "Grade IX",
    image: garde9,
    subtitle: "Campus 4_Faraz(Rawalpindi)",
    route: "/all-classes/grade/IX",
  },
  {
    id: 10,
    image: garde10,
    title: "Grade X",
    subtitle: "Campus 5_Faraz(Rawalpindi)",
    route: "/all-classes/grade/X",
  },
];

const AllClasses = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
  });

  const navigate = useNavigate();

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
          <Dropdown placeholder="Grade" options={options} />
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
            <GradeBlock onClick={() => navigate(grade.route)} {...grade} />
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
