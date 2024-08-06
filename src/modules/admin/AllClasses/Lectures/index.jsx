import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import InputField from "@/components/common/InputField";
import AddNewLecture from "@/components/modals/AddNewLecture";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddLectureFields } from "@/constants/forms";
import { LecturesColumns } from "@/constants/table-constants";
import { parseLectureListing } from "@/parsers/student-parser";
import {
  addLecture,
  deleteLecture,
  getLectures,
  updateLecture,
} from "@/store/actions/lecturesActions";
import { handleError } from "@/utils/errorHandling";
import { fetchFileFromUrl } from "@/utils/helper";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const LecturesPage = () => {
  const [state, setState] = useState({
    page: 0,
    size: 10,
    totalPages: 1,
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
    isLoading: false,
  });

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { search } = useLocation();

  const { lecturesData } = useSelector((s) => s.lectureReducer);

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

  const handleDelete = () => {
    const { selectedRecord } = state;

    dispatch(
      deleteLecture({
        payload: {
          query: {
            lectureId: selectedRecord?.lectureId,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          toast.success("Deleted Successfully!");
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const fetchListing = () => {
    const { page, size } = state;
    const queryPage = search.split("=")[1];

    const queryParams = `?page=${
      queryPage ? queryPage - 1 : page
    }&size=${size}`;

    dispatch(
      getLectures({
        onSuccess: (res) => {
          setState((prev) => ({
            ...prev,
            page: res.ogaPagination?.number,
            totalPages: res.ogaPagination?.totalPages,
          }));
        },
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId,
            queryParams,
          },
          dispatch,
        },
      })
    );
  };

  const handleAddLecture = async (formValues) => {
    const { selectedRecord, isEditMode } = state;

    handleLoader(true);

    const formData = new FormData();

    const apiPayload = {
      courseId,
      description: formValues.description,
      lectureTitle: formValues.lectureTitle,
      visible: true,
    };

    Object.entries(apiPayload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const apiToCall = isEditMode ? updateLecture : addLecture;

    const oldFile = selectedRecord?.file
      ? await fetchFileFromUrl(selectedRecord?.file)
      : "";

    if (isEditMode) {
      formData.append(
        "file",
        formValues.file[0] instanceof File ? formValues.file[0] : oldFile
      );
      formData.append("lectureId", selectedRecord.lectureId);
    } else {
      formData.append("file", formValues.file[0]);
    }

    dispatch(
      apiToCall({
        onSuccess: () => {
          handleLoader(false);
          toast.success(
            isEditMode
              ? "Lecture Updated Successfully!"
              : "Lecture Created Successfully"
          );
          // handleModal("addNewModalIsOpen");
          fetchListing();
        },
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          body: formData,
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    fetchListing();

    // fetchCompusListing(dispatch);
  }, []);

  if (lecturesData.loading || state.isLoading) {
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
          Add New Lecture
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={4}>
          {/* <InputField icon="/search-icon.svg" /> */}
        </Grid>
        <Grid item md={3} />

        {/* <Grid item md={3}>
          <Dropdown placeholder="Published Date" options={options} />
        </Grid> */}
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={LecturesColumns}
          rows={parseLectureListing(
            lecturesData?.data?.lectureList ?? [],
            handleModal
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddNewLecture
          title={state.isEditMode ? "Edit Lecture" : "Add Lecture"}
          subtitle="Lecture Details"
          fields={AddLectureFields()}
          handleAddLecture={handleAddLecture}
          // editValues={state.selectedRecord}
          editValues={
            state.selectedRecord
              ? {
                  ...state.selectedRecord,
                  file: [state?.selectedRecord?.powerPointURL],
                }
              : null
          }
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

export default LecturesPage;
