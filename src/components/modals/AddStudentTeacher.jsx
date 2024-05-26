import { AddStudentFields } from "@/constants/forms";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import DynamicField from "../common/DynamicField";
import Button from "../common/Button";

const defaultValues = {
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
  schema,
  handleAddUser,
  initialValues,
  editValues,
  fields = [],
  handleModal,
  title = "Add Student",
  subtitle = "Student Details",
}) => {
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormik({
    initialValues: editValues ?? initialValues ?? defaultValues,
    // enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log({ values });
      handleAddUser(values);
      handleModal();
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-black text-6xl font-bold py-6">{title}</h2>
        <img
          className="cursor-pointer"
          onClick={handleModal}
          src="/close-icon.svg"
          alt="close-icon"
        />
      </div>

      <h4 className="text-[#474747A6] text-3xl font-semibold py-6">
        {subtitle}
      </h4>
      <form onSubmit={handleSubmit}>
        <Grid className="pb-8" container spacing={4}>
          {fields?.map((field, key) => (
            <Grid item sm={field.column} key={key}>
              <DynamicField
                field={field}
                error={errors[field.name]}
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
