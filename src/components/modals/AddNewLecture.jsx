import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../common/Button";
import DynamicField from "../common/DynamicField";
import { lectureSchema } from "@/schema";

const defaultValues = {
  lectureTitle: "",
  description: "",
  file: "",
};

const AddNewLecture = ({
  handleAddLecture,
  initialValues,
  editValues,
  fields = [],
  handleModal,
  title = "Add New Lecture",
  subtitle = "Lecture Details",
}) => {
  const [state, setState] = useState({
    formFields: [],
    formValues: editValues ?? initialValues,
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: editValues ?? initialValues ?? defaultValues,
    // enableReinitialize: true,
    validationSchema: lectureSchema,
    onSubmit: (values) => {
      handleAddLecture(values);
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
                touched={touched[field.name]}
                disabled={field.isDisabled}
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

export default AddNewLecture;
