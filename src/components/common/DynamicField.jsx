import React from "react";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import FileUpload from "./FileUpload";

const DynamicField = (props) => {
  const renderField = () => {
    switch (props?.field?.type) {
      case "number":
      case "email":
      case "date":
      case "password":
      case "textarea":
      case "text": {
        return <InputField {...props.field} {...props} />;
      }

      case "dropdown": {
        return <Dropdown {...props.field} {...props} />;
      }

      case "file": {
        return <FileUpload {...props.field} {...props} />;
      }

      default:
        <></>;
    }
  };
  return <div>{renderField()}</div>;
};

export default DynamicField;
