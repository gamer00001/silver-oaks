import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import SearchField from "@/components/common/SearchField";
import { ManageTeachersColumns } from "@/constants/table-constants";
import { MockTeacherStudentsData } from "@/parsers/student-parser";
import React from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageTeachers = () => {
  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button variant="primary" size="large">
          Upload CSV
        </Button>

        <Button variant="secondary" size="large">
          Add Teacher
        </Button>
      </div>

      <div className="p-12 flex gap-10 justify-between">
        <div>
          <SearchField />
        </div>

        <div className="flex gap-12">
          <Dropdown placeholder="Select Grade" options={options} />
          <Dropdown placeholder="Campus" options={options} />
        </div>
      </div>

      <div className="p-12">
        <CustomTable
          columns={ManageTeachersColumns}
          rows={MockTeacherStudentsData()}
        />
      </div>
    </div>
  );
};

export default ManageTeachers;
