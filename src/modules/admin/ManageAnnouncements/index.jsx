import { ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddAnnouncement from "@/components/modals/AddAnnouncement";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddAnnouncementFields } from "@/constants/forms";
import { ManageAnnouncementsColumns } from "@/constants/table-constants";
import { MockAnnouncementsData } from "@/parsers/announcement-parser";
import { Grid } from "@mui/material";
import React, { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageAnnouncements = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
  });

  const handleModal = (key = "deleteModalIsOpen") => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          variant="secondary"
          size="large"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add New Announcement
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField type="text" placeholder="Search announcements" />
        </Grid>

        <Grid item md={3}>
          <Dropdown placeholder="Visibility" options={options} />
        </Grid>
        <Grid item md={3}>
          <Dropdown placeholder="Grade" options={options} />
        </Grid>
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={ManageAnnouncementsColumns}
          rows={MockAnnouncementsData(handleModal)}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddAnnouncement
          subtitle="Create Announcement"
          fields={AddAnnouncementFields()}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default ManageAnnouncements;
