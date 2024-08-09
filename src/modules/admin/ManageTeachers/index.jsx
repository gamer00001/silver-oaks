import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddTeacher from "@/components/modals/AddTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddTeacherFields } from "@/constants/forms";
import { ManageTeachersColumns } from "@/constants/table-constants";
import { UploadAssignmnet } from "@/modules/Assignment";
import { parseAddTeacherData } from "@/parsers/admin-parser";
import { parseTeachersListing } from "@/parsers/student-parser";
import { AddTeacherSchema, EditTeacherSchema } from "@/schema";
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  fetchTeachersListing,
  uploadBulkTeachers,
} from "@/store/actions/teacherActions";
import { fetchCompusListing } from "@/utils/common-api-helper";
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { MOCK_GRADES } from "../AllClasses";

const initialValues = {
  employeeName: "",
  campusName: "",
  gender: "",
  password: "",
  dateOfBirth: "",
  joiningDate: "",
  phoneNumber: "",
  email: "",
  sectionsList: [
    {
      grade: "",
      section: "",
    },
  ],
};

const ManageTeachers = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
    isLoading: false,
    search: "",
    page: 0,
    size: 10,
    totalPages: 1,
    selectedCampus: null,
    selectedGrade: null,
  });

  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const { search } = useLocation();

  const {
    teachersListing: { data, loading },
  } = useSelector((s) => s.teacherReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const handleGrade = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      selectedGrade: selectedValue,
    }));
  };

  const handleCampus = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      selectedCampus: selectedValue,
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
      uploadedFile: "",
      selectedRecord: {
        ...selectedRecord,
        sectionsList: selectedRecord?.teacherSectionList ?? [],
        employeeName: selectedRecord?.employee_Name,
        campusName: selectedRecord?.campus_Name,
        // grade: "",
        // section: "",
        dateOfBirth: selectedRecord?.date_Of_Birth,
        joiningDate: selectedRecord?.joining_date,
        phoneNumber: selectedRecord?.phone_number,
      },
    }));
  };

  const handleAddUser = (formData) => {
    const { isEditMode, selectedRecord } = state;

    let parseData = parseAddTeacherData(formData);

    if (isEditMode) {
      parseData = {
        ...parseData,
        teacherId: selectedRecord.teacher_Id,
      };
    }

    const apiToCall = isEditMode ? editTeacher : addTeacher;

    dispatch(
      apiToCall({
        payload: {
          body: parseData,
        },
        onSuccess: (resp) => {
          fetchListing();
          handleModal("addNewModalIsOpen");
          toast.success(
            `Teacher ${isEditMode ? "updated" : "created"} successfully!`
          );
        },
        onError: (error) => {
          handleModal("addNewModalIsOpen");
          handleError(error);
        },
      })
    );
  };

  const handleDeleteUser = () => {
    const { selectedRecord } = state;

    dispatch(
      deleteTeacher({
        payload: {
          query: {
            teacherId: selectedRecord?.teacher_Id,
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

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setState((prev) => ({
      ...prev,
      uploadedFile: file,
    }));
  };

  const handleUploadAssignment = () => {
    handleLoader(true);

    const formData = new FormData();

    formData.append("file", state.uploadedFile);

    dispatch(
      uploadBulkTeachers({
        onSuccess: () => {
          handleLoader(false);
          handleModal("uploadModalIsOpen");
          toast.success("File Uploaded Successfully!");
          fetchListing();
        },
        onError: (error) => {
          handleLoader(false);
          handleModal("uploadModalIsOpen");
          handleError(error);
        },
        payload: {
          query: {
            queryParams: "",
          },
          body: formData,
          dispatch,
        },
      })
    );
  };

  const fetchListing = () => {
    const { page, size, selectedGrade, selectedCampus } = state;

    const queryPage = search.split("=")[1];

    const queryParams = `${selectedCampus}?${
      selectedGrade ? `grade=${selectedGrade}&` : ""
    }page=${queryPage ? queryPage - 1 : page}&size=${size}`;

    if (selectedCampus) {
      dispatch(
        fetchTeachersListing({
          payload: {
            query: {
              queryParams,
            },
            dispatch,
          },
          onSuccess: (res) => {
            setState((prev) => ({
              ...prev,
              page: res?.teacherJoinDataPage?.number,
              totalPages: res?.teacherJoinDataPage?.totalPages,
            }));
          },
        })
      );
    }
  };

  useEffect(() => {
    fetchListing();
  }, [state.selectedCampus, state.selectedGrade, search]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      selectedCampus: campusesData?.data
        ? campusesData?.data[0]?.campusName
        : "",
    }));
  }, [campusesData]);

  useEffect(() => {
    fetchCompusListing(dispatch);
  }, []);

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          variant="primary"
          size="large"
          onClick={() => handleModal("uploadModalIsOpen")}
        >
          Upload CSV
        </Button>

        <Button
          size="large"
          variant="secondary"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add Teacher
        </Button>
      </div>

      <div className="px-12 py-12 flex items-center gap-4">
        <div className="w-[220px] max-md:w-[120px]">
          <Dropdown
            placeholder="Select Grade"
            onChange={handleGrade}
            value={state.selectedGrade}
            options={MOCK_GRADES().map((item) => item.title)}
          />
        </div>
        <div className="w-[220px] max-md:w-[120px]">
          <Dropdown
            placeholder="Campus"
            value={state?.selectedCampus}
            onChange={handleCampus}
            options={
              campusesData?.data
                ? campusesData?.data?.map((item) => item?.campusName)
                : []
            }
          />
        </div>
      </div>

      <div className="p-12">
        <CustomTable
          page={state.page + 1}
          totalPages={state.totalPages}
          columns={ManageTeachersColumns}
          rows={parseTeachersListing(
            data?.teacherJoinDataPage?.content ?? [],
            handleModal
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.uploadModalIsOpen}
        onClose={() => handleModal("uploadModalIsOpen")}
      >
        <UploadAssignmnet
          state={state}
          title="Upload File"
          acceptedFiles=".csv"
          uploadFile={uploadFile}
          inputFileRef={inputFileRef}
          handleUploadAssignment={handleUploadAssignment}
          fileTypeText={"Excel File xlsx, file size no more than 10MB"}
          onClose={() => {
            handleModal("uploadModalIsOpen");
          }}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddTeacher
          schema={state.isEditMode ? EditTeacherSchema : AddTeacherSchema}
          subtitle="Teacher Details"
          initialValues={initialValues}
          handleAddUser={handleAddUser}
          campusesData={campusesData?.data ?? []}
          editValues={state.selectedRecord}
          fields={
            state.isEditMode
              ? AddTeacherFields(campusesData?.data).filter(
                  (field) => field.name !== "password"
                )
              : AddTeacherFields(campusesData?.data) ?? []
          }
          handleModal={() => handleModal("addNewModalIsOpen")}
          title={state.isEditMode ? "Edit Teacher" : "Add Teacher"}
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleAction={handleDeleteUser}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
      {(loading || state.isLoading || campusesData.loading) && (
        <Loader type={"screen"} />
      )}
    </div>
  );
};

export default ManageTeachers;
