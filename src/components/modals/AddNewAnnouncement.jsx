import { AddNewAnnouncementSchema } from "@/schema";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

import Button from "../common/Button";
import DynamicField from "../common/DynamicField";

const initialValues = {
  title: "",
  time: null,
  type: "",
  eventDate: "",
  description: "",
};

const AddNewAnnouncement = ({
  title = "Add Announcement",
  subtitle = "Student Details",
  fields = [],
  handleModal,
  handleAdd,
  editValues,
}) => {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: editValues ?? initialValues,
    validationSchema: AddNewAnnouncementSchema,
    // enableReinitialize: true,
    onSubmit: (formValues) => {
      handleModal();
      handleAdd(formValues);
    },
  });

  return (
    <div>
      <h2 className="text-black text-6xl font-bold py-6">{title}</h2>

      <h4 className="text-[#474747A6] text-3xl font-semibold py-6">
        {subtitle}
      </h4>
      <form onSubmit={handleSubmit}>
        <Grid className="pb-12" container spacing={4}>
          {fields?.map((field, key) => (
            <Grid item sm={field.column} key={key}>
              <DynamicField
                field={field}
                error={errors[field.name]}
                touched={touched[field.name]}
                value={values[field.name]}
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
          Send Announcement
        </Button>
      </form>
    </div>
  );
};

export default AddNewAnnouncement;
