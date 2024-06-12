import { fetchSectonsListing } from "@/utils/common-api-helper";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../common";
import Button from "../common/Button";
import DynamicField from "../common/DynamicField";

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
  campusesData,
  handleAddUser,
  initialValues,
  editValues,
  fields = [],
  handleModal,
  title = "Add Student",
  subtitle = "Student Details",
}) => {
  const [state, setState] = useState({
    formFields: [],
    formValues: editValues ?? initialValues,
  });

  const dispatch = useDispatch();

  const { sectionsData } = useSelector((s) => s.commonReducer);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: editValues ?? initialValues ?? defaultValues,
      // enableReinitialize: true,
      validationSchema: schema,
      onSubmit: (values) => {
        handleAddUser(values);
        // handleModal();
      },
    });

  const getField = (field) => {
    if (field.name === "section") {
      const sectionsOptions = sectionsData?.data?.map(
        (item) => item.sectionName
      );

      return {
        ...field,
        options: sectionsOptions,
      };
    } else {
      return field;
    }
  };

  useEffect(() => {
    if (
      (state?.formValues["grade"] !== values["grade"] ||
        state?.formValues["campusName"] !== values["campusName"]) &&
      !isEmpty(values.campusName) &&
      !isEmpty(values.grade)
    ) {
      fetchSectonsListing(
        dispatch,
        campusesData.find((item) => item.campusName === values.campusName)?.id,
        values.grade
      );

      const event = {
        target: {
          name: "section",
          value: "",
        },
      };

      handleChange(event);

      setState((prev) => ({
        ...prev,
        formValues: values,
      }));
    }
  }, [values]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      formFields: fields,
    }));
  }, [fields]);

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
          {state?.formFields?.map((field, key) => (
            <Grid item sm={field.column} key={key}>
              <DynamicField
                field={getField(field)}
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
          Submit
        </Button>
      </form>

      {sectionsData.loading && <Loader type="screen" />}
    </div>
  );
};

export default AddStudentTeacher;
