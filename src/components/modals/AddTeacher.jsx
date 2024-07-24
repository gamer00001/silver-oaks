import { fetchSectonsListing } from "@/utils/common-api-helper";
import { Grid } from "@mui/material";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loader } from "../common";
import Button from "../common/Button";
import DynamicField from "../common/DynamicField";
import { GradeSectionSelectionFields } from "@/constants/forms";
import toast from "react-hot-toast";
import { fetchSectionsByCampus } from "@/store/actions/commonActions";

const defaultSection = {
  grade: "",
  section: "",
};

const AddTeacher = ({
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

  const { sectionsData } = useSelector((s) => s.commonReducer);

  const handleSubmitForm = (values) => {
    handleAddUser(values);
  };

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
      {/* <form onSubmit={handleSubmit}> */}
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Grid className="pb-8" container spacing={4}>
              {state?.formFields?.map((field, key) => (
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

                      if (field.name === "campusName") {
                        const event2 = {
                          target: {
                            name: "sectionsList",
                            value: [defaultSection],
                          },
                        };

                        handleChange(event2);
                        handleChange(event);
                      } else {
                        handleChange(event);
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <FieldArray name="sectionsList">
              {({ push, remove }) => (
                <div className="pb-12">
                  <h2 className="text-black text-4xl font-bold py-6">
                    Add Sections
                  </h2>

                  {values.sectionsList?.map((section, qIndex) => (
                    <div
                      key={qIndex}
                      className="mb-6 p-4 bg-white rounded-lg border"
                    >
                      <AddSectionForTeacher
                        key={qIndex}
                        errors={errors}
                        values={values}
                        touched={touched}
                        formIndex={qIndex}
                        handleChange={handleChange}
                        campusesData={campusesData}
                      />

                      <button
                        type="button"
                        onClick={() => remove(qIndex)}
                        className="mt-2 text-xl font-semibold border border-red-500 text-red-500 px-5 py-3 rounded-xl"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() =>
                      push({
                        grade: "",
                        section: "",
                      })
                    }
                  >
                    Add Section
                  </Button>
                </div>
              )}
            </FieldArray>
            <Button
              type="submit"
              variant="primary"
              size={"large"}
              fullWidth={true}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {sectionsData.loading && <Loader type="screen" />}
    </div>
  );
};

export default AddTeacher;

const AddSectionForTeacher = ({
  formIndex,
  errors,
  touched,
  values,
  campusesData,
  handleChange,
}) => {
  const dispatch = useDispatch();

  const [sectionsList, setSectionsList] = useState([]);

  const fetchSectionsForGrade = (grade) => {
    if (!isEmpty(values.campusName)) {
      const campusId = campusesData.find(
        (item) => item.campusName === values.campusName
      )?.id;

      dispatch(
        fetchSectionsByCampus({
          payload: {
            query: {
              campusId,
              grade,
            },
            dispatch,
          },
          onSuccess: (resp) => {
            const options = resp?.map((item) => item.sectionName);

            const updatedList = { ...sectionsList };

            updatedList[formIndex] = options;

            setSectionsList(updatedList);
          },
        })
      );
    } else {
      return toast.error("Select Campus first");
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        {GradeSectionSelectionFields().map((item, index) => (
          <Grid item sm={6} key={index}>
            <DynamicField
              field={{
                ...item,
                options:
                  item.name === "section"
                    ? sectionsList[formIndex]
                    : item.options,
              }}
              error={
                errors &&
                errors?.sectionsList &&
                errors?.sectionsList[formIndex] &&
                errors?.sectionsList[formIndex][item.name]
              }
              touched={
                touched &&
                touched?.sectionsList &&
                touched?.sectionsList[formIndex] &&
                touched?.sectionsList[formIndex][item.name]
              }
              value={values?.sectionsList[formIndex][item.name]}
              disabled={item.isDisabled}
              onChange={(value) => {
                const event = {
                  target: {
                    name: `sectionsList[${formIndex}][${item.name}]`,
                    value: value,
                  },
                };
                item.name === "grade" && fetchSectionsForGrade(value);
                handleChange(event);
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* {sectionsData.loading && <Loader type="screen" />} */}
    </>
  );
};
