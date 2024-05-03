import React from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";

const DynamicField = ({ field }) => {
  const renderField = () => {
    switch (field.type) {
      case "number":
      case "email":
      case "date":
      case "password":
      case "text": {
        return <InputField {...field} />;
      }

      case "dropdown": {
        return <Dropdown {...field} />;
      }

      default:
        <></>;
    }
  };
  return <div>{renderField()}</div>;
};

export default DynamicField;
