import { AddStudentFields } from "@/constants/forms";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import DynamicField from "../common/DynamicField";
import Button from "../common/Button";

const initialValues = {
  name: "",
  grade: "",
  roleNumber: "",
  section: "",
  campus: "",
  gender: "",
  password: "",
  dob: "",
  guardianName: "",
  city: "",
  guardianEmail: "",
  contactNumber: "",
  address: "",
};

const AddStudentTeacher = ({
  title = "Add Student",
  subtitle = "Student Details",
  fields = [],
  handleModal,
}) => {
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (v) => {
      handleModal();
      // if (!v.query) delete v.query;
      // navigate(`${pathname}?${convertObjectToQueryString({ ...v, page: 1 })}`);
      // scrollToTop();
    },
  });

  return (
    <div>
      <h2 className="text-black text-6xl font-bold py-6">{title}</h2>

      <h4 className="text-[#474747A6] text-3xl font-semibold py-6">
        {subtitle}
      </h4>
      <form onSubmit={handleSubmit}>
        <Grid className="pb-8" container spacing={4}>
          {fields?.map((field, key) => (
            <Grid item sm={field.column} key={key}>
              <DynamicField field={field} onChange={handleChange} />
            </Grid>
          ))}
        </Grid>

        <Button variant="primary" size={"large"} fullWidth={true}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddStudentTeacher;
