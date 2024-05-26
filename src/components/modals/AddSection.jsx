import React, { useState } from "react";
import Button from "../common/Button";
import {
  AddCampusFields,
  AddGradeFields,
  AddSectionFields,
} from "@/constants/forms";
import DynamicField from "../common/DynamicField";
import { AddCampusSchema, AddSectionSchema } from "@/schema";
import { useFormik } from "formik";

const TYPES = ["Campus", "Section"];

const AddNewClass = ({
  handleModal,
  title = "Add New",
  campusesOptions,
  handleAddCampus,
  handleAddSection,
}) => {
  const [state, setState] = useState({
    selectionOption: null,
    showAddSelection: true,
    // selectedItem: "",
    fields: [],
  });

  const handleSelectedOption = (option, fields, showAddSelection = true) => {
    setState((prev) => ({
      ...prev,
      fields,
      showAddSelection,
      selectionOption: option,
    }));
  };

  const handleSelect = () => {
    const { selectionOption } = state;

    switch (selectionOption) {
      // case "Grade":
      //   return handleSelectedOption(selectionOption, AddGradeFields(), false);
      case "Campus":
        return handleSelectedOption(selectionOption, AddCampusFields(), false);
      case "Section":
        return handleSelectedOption(
          selectionOption,
          AddSectionFields(campusesOptions),
          false
        );

      default:
        return;
    }
  };

  console.log({ state });

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

      <div className="flex flex-col gap-8 py-12">
        {state.showAddSelection ? (
          <>
            {TYPES.map((type, key) => (
              <ClassType
                key={key}
                title={type}
                selectionOption={state.selectionOption}
                handleSelect={() => handleSelectedOption(type, [])}
              />
            ))}
            <Button
              variant="primary"
              size={"large"}
              fullWidth={true}
              onClick={handleSelect}
            >
              {`Continue`}
            </Button>
          </>
        ) : (
          <>
            {state.selectionOption === "Campus" ? (
              <AddNewCampus
                fields={state.fields}
                schema={AddCampusSchema}
                handleAddCampus={handleAddCampus}
                initialValues={{
                  name: "",
                }}
              />
            ) : (
              <>
                <AddNewCampus
                  addCampus={false}
                  fields={state.fields}
                  schema={AddSectionSchema}
                  handleAddCampus={handleAddSection}
                  handleAddSection={handleAddSection}
                  initialValues={{
                    name: "",
                    grade: "",
                    campus: "",
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddNewClass;

const ClassType = ({ title = "Grade", selectionOption, handleSelect }) => {
  return (
    <div
      onClick={handleSelect}
      className={`border ${
        selectionOption === title ? "border-custom-red" : "border-[#E9E9E9]"
      } rounded-2xl p-8 flex items-center gap-8 hover:border-custom-red cursor-pointer`}
    >
      <img src="/class-icon.svg" icon />
      <span className="text-[#AFAFAF] text-2xl font-semibold">{title}</span>
    </div>
  );
};

const AddNewCampus = ({
  addCampus = true,
  fields,
  schema,
  initialValues,
  handleAddCampus,
  handleAddSection,
}) => {
  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      if (addCampus) {
        handleAddCampus(values);
      } else {
        handleAddSection(values);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {fields?.map((field, key) => (
        <div className="py-6" key={key}>
          <DynamicField
            // key={key}
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
        </div>
      ))}

      <div className="pt-10">
        <Button variant="primary" size={"large"} type="submit" fullWidth={true}>
          {`Submit`}
        </Button>
      </div>
    </form>
  );
};
