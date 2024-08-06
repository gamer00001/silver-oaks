import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import InputField from "@/components/common/InputField";
import AddNewAnnouncement from "@/components/modals/AddNewAnnouncement";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddNewAnnouncementFields } from "@/constants/forms";
import { ManageAnnouncementsColumns } from "@/constants/table-constants";
import { parseAnnouncementListing } from "@/parsers/student-parser";
import {
  addEvent,
  deleteEvent,
  editEvent,
  getEventsByStudent,
} from "@/store/actions/eventActions";
import { handleError } from "@/utils/errorHandling";
import { removeEmptyValues } from "@/utils/helper";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AdminAnnouncements = () => {
  const [state, setState] = useState({
    page: 0,
    size: 10,
    totalPages: 1,
    isLoading: false,
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { courseId, courseName, sectionName, campusName, gradeId } =
    useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentEvents } = useSelector((s) => s.eventReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const handleModal = (
    key = "deleteModalIsOpen",
    selectedRecord,
    isEditMode = false
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
      isEditMode,
      selectedRecord: selectedRecord,
    }));
  };

  const fetchListing = () => {
    // const queryParams = `&section=${sectionName}`;
    dispatch(
      getEventsByStudent({
        payload: {
          query: {
            page: 0,
            size: 500,
            courseId,
            section: sectionName,
            // queryParams,
          },
          dispatch,
        },
      })
    );
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    handleModal("deleteModalIsOpen");

    handleLoader();

    dispatch(
      deleteEvent({
        payload: {
          query: {
            eventId: selectedRecord?.id,
          },
        },
        onSuccess: (resp) => {
          toast.success("Deleted Successfully!");
          fetchListing();
          handleLoader();
        },
        onError: (error) => {
          console.log({ error });
          handleLoader();
          handleError(error);
        },
      })
    );
  };

  const handleAdd = (formValues) => {
    const { isEditMode, selectedRecord } = state;

    let payload = {
      ...formValues,
      courseId,
      section: sectionName,
    };

    let apiToCall;

    if (isEditMode) {
      apiToCall = editEvent;
      payload = {
        ...payload,
        id: selectedRecord?.id,
      };
    } else {
      apiToCall = addEvent;
    }

    dispatch(
      apiToCall({
        payload: {
          body: removeEmptyValues(payload),
          dispatch,
        },
        onSuccess: () => {
          toast.success("Added Successfully!");
          fetchListing();
        },
        onError: (error) => {
          handleError(error);
        },
      })
    );
  };

  useEffect(() => {
    fetchListing();
  }, []);

  if (studentEvents.loading || state.isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="secondary"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add New Announcement
        </Button>
      </div>

      {/* <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField icon="/search-icon.svg" />
        </Grid>
        <Grid item md={3} />
      </Grid> */}

      <div className="p-12">
        <CustomTable
          columns={ManageAnnouncementsColumns}
          rows={parseAnnouncementListing(
            studentEvents?.data?.eventList ?? [],
            handleModal
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[65.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddNewAnnouncement
          option="Campus"
          title={`${state.isEditMode ? "Edit" : "Add"} New Announcement`}
          subtitle=""
          handleAdd={handleAdd}
          fields={AddNewAnnouncementFields()}
          editValues={{
            ...state?.selectedRecord,
          }}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleAction={handleDelete}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default AdminAnnouncements;
