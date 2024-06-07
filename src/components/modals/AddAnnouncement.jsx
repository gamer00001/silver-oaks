import { Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import DynamicField from "../common/DynamicField";
import Button from "../common/Button";
import { AddAnnouncementSchema } from "@/schema";

const initialValues = {
  title: "",
  visibleTo: "",
  date: "",
  grade: "",
};

const AddAnnouncement = ({
  title = "Add Announcement",
  subtitle = "Student Details",
  fields = [],
  handleModal,
}) => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: AddAnnouncementSchema,
      // enableReinitialize: true,
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
        <Grid className="pb-32" container spacing={4}>
          {fields?.map((field, key) => (
            <Grid item sm={field.column} key={key}>
              <DynamicField
                field={field}
                onChange={handleChange}
                error={errors[field.name]}
                touched={touched[field.name]}
              />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="primary" size={"large"} fullWidth={true}>
          Send Announcements
        </Button>
      </form>
    </div>
  );
};

export default AddAnnouncement;
