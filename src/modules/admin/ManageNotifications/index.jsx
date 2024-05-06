import { ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddAnnouncement from "@/components/modals/AddAnnouncement";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddNotificationFields } from "@/constants/forms";
import { ManageNotificationsColumns } from "@/constants/table-constants";
import { MockAnnouncementsData } from "@/parsers/announcement-parser";
import { Grid } from "@mui/material";
import React, { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageNotifications = () => {
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
          Create New Notification
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField type="text" placeholder="Search notification" />
        </Grid>

        <Grid item md={3}>
          <Dropdown placeholder="Sent to" options={options} />
        </Grid>
        <Grid item md={3}>
          <Dropdown placeholder="Grade" options={options} />
        </Grid>
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={ManageNotificationsColumns}
          rows={MockAnnouncementsData(handleModal)}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddAnnouncement
          title="Add Notification"
          subtitle="Create Notification"
          fields={AddNotificationFields()}
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

export default ManageNotifications;
