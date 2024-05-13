import { AddStudentFields } from "@/constants/forms";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import DynamicField from "../common/DynamicField";
import Button from "../common/Button";

const initialValues = {
  name: "",
  studentName: "",
  grade: "",
  roleNumber: "",
  section: "",
  campusName: "",
  gender: "",
  password: "",
  dateOfBirth: "",
  guardianName: "",
  city: "",
  guardianEmail: "",
  guardianPhoneNumber: "",
  address: "",
};

const AddStudentTeacher = ({
  handleAddUser,
  editValues,
  fields = [],
  handleModal,
  title = "Add Student",
  subtitle = "Student Details",
}) => {
  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues: editValues ?? initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log({ values });
      handleModal();
      handleAddUser(values);
      // if (!v.query) delete v.query;
      // navigate(`${pathname}?${convertObjectToQueryString({ ...v, page: 1 })}`);
      // scrollToTop();
    },
  });

  console.log({ values, editValues });

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
              <DynamicField
                field={field}
                value={values[field.name]}
                onChange={(value) => {
                  const event = {
                    target: {
                      name: field.name,
                      value: value,
                    },
                  };
                  handleChange(event);
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="primary" size={"large"} fullWidth={true}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddStudentTeacher;
