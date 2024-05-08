import React, { useState } from "react";
import Button from "../common/Button";
import {
  AddCampusFields,
  AddGradeFields,
  AddSectionFields,
} from "@/constants/forms";
import DynamicField from "../common/DynamicField";

const TYPES = ["Grade", "Campus", "Section"];

const AddNewClass = ({ title = "Add New", handleModal }) => {
  const [state, setState] = useState({
    selectionOption: null,
    showAddSelection: true,
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
      case "Grade":
        return handleSelectedOption(selectionOption, AddGradeFields(), false);
      case "Campus":
        return handleSelectedOption(selectionOption, AddCampusFields(), false);
      case "Section":
        return handleSelectedOption(selectionOption, AddSectionFields(), false);

      default:
        return;
    }
  };

  console.log({ state });

  return (
    <div>
      <h2 className="text-black text-6xl font-bold py-6">{title}</h2>

      <div className="flex flex-col gap-8 py-12">
        {state.showAddSelection ? (
          <>
            {TYPES.map((type) => (
              <ClassType
                key={type}
                title={type}
                selectionOption={state.selectionOption}
                handleSelect={() => handleSelectedOption(type, [])}
              />
            ))}
          </>
        ) : (
          <>
            {state?.fields?.map((item, index) => (
              <DynamicField key={index} field={item} />
            ))}
          </>
        )}
      </div>

      <Button
        variant="primary"
        size={"large"}
        fullWidth={true}
        onClick={handleSelect}
      >
        Continue
      </Button>
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
