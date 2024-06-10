import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddStudentFields } from "@/constants/forms";
import { ManageStudentsColumns } from "@/constants/table-constants";
import { parseAddStudentData } from "@/parsers/admin-parser";
import {
  MockManageStudentsData,
  parseStudentListing,
} from "@/parsers/student-parser";
import {
  addStudent,
  deleteStudent,
  editStudent,
  fetchStudentsListing,
  fetchStudentsListingByFilterApi,
  uploadBulkStudents,
} from "@/store/actions/studentActions";
import {
  fetchCompusListing,
  fetchSectonsListing,
} from "@/utils/common-api-helper";
import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MOCK_GRADES } from "../AllClasses";
import { AddStudentSchema, EditStudentSchema } from "@/schema";
import toast from "react-hot-toast";
import { UploadAssignmnet } from "@/modules/Assignment";

const initialValues = {
  studentName: "",
  grade: "",
  campusName: "",
  rollNumber: "",
  section: "",
  gender: "",
  password: "",
  dateOfBirth: "",
  guardianName: "",
  city: "",
  guardianEmail: "",
  guardianPhoneNumber: "",
  address: "",
};

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const ManageStudents = () => {
  const [state, setState] = useState({
    isLoading: false,
    uploadModalIsOpen: false,
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
    search: "",
    selectedCampus: null,
    selectedGrade: null,
    selectedSection: null,
  });

  const dispatch = useDispatch();
  const inputFileRef = useRef(null);

  const {
    studentsListing: { data, loading },
    filteredStudentsListing: { filteredStudents, filteredLoading },
  } = useSelector((s) => s.studentReducer);

  const { campusesData, sectionsData } = useSelector((s) => s.commonReducer);

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
      uploadedFile: "",
      selectedRecord: selectedRecord,
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

  const handleSection = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      selectedSection: selectedValue,
    }));
  };

  const handleAddUser = (formData) => {
    const { isEditMode, selectedRecord } = state;

    let parseData = parseAddStudentData(formData);

    if (isEditMode) {
      parseData = {
        ...selectedRecord,
        ...parseData,
        studentId: selectedRecord.studentId,
      };
    }

    const apiToCall = isEditMode ? editStudent : addStudent;

    dispatch(
      apiToCall({
        payload: {
          body: parseData,
        },
        onSuccess: (resp) => {
          toast.success("Student added successfully!");
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const handleDeleteUser = () => {
    const { selectedRecord } = state;

    handleLoader(true);

    dispatch(
      deleteStudent({
        payload: {
          query: {
            rollNumber: selectedRecord?.rollNumber,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          fetchListing();
          handleLoader(false);
          toast.success("Student Deleted Successfully!");
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const fetchListing = () => {
    dispatch(
      fetchStudentsListing({
        payload: {
          query: {
            page: 0,
            size: 10,
            campus: state?.selectedCampus ?? "",
          },
          dispatch,
        },
      })
    );
  };

  const fetchStudentsListingByFilter = () => {
    const { selectedGrade, selectedCampus, selectedSection } = state;

    const queryParams = `${selectedCampus}?course=ICT${
      selectedGrade ? `&grade=${selectedGrade}` : ""
    }${selectedSection ? `&section=${selectedSection}` : ""}`;

    if (selectedCampus) {
      dispatch(
        fetchStudentsListingByFilterApi({
          payload: {
            query: {
              queryParams,
            },
            dispatch,
          },
        })
      );
    }
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
      uploadBulkStudents({
        onSuccess: () => {
          handleLoader(false);
          handleModal("uploadModalIsOpen");
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

  useEffect(() => {
    const { selectedCampus, selectedGrade } = state;

    fetchStudentsListingByFilter();

    if (selectedCampus && selectedGrade) {
      fetchSectonsListing(
        dispatch,
        campusesData?.data?.find((item) => item.campusName === selectedCampus)
          ?.id,
        selectedGrade
      );
    }
  }, [state.selectedCampus, state.selectedGrade, state.selectedSection]);

  useEffect(() => {
    // fetchListing();
    fetchCompusListing(dispatch);
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      selectedCampus: campusesData?.data
        ? campusesData?.data[0]?.campusName
        : "",
    }));
  }, [campusesData]);

  if (loading || filteredLoading || state.isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="primary"
          onClick={() => handleModal("uploadModalIsOpen")}
        >
          Upload CSV
        </Button>

        <Button
          variant="secondary"
          size="large"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add Student
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={4}>
          <InputField />
        </Grid>

        <Grid item sm={2} md={2} />

        <Grid item md={2}>
          <Dropdown
            placeholder="Select Grade"
            onChange={handleGrade}
            value={state.selectedGrade}
            options={MOCK_GRADES().map((item) => item.title)}
          />
        </Grid>
        <Grid item md={2}>
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
        </Grid>
        <Grid item md={2}>
          <Dropdown
            placeholder="Section"
            onChange={handleSection}
            value={state.selectedSection}
            options={
              sectionsData?.data?.map((section) => section.sectionName) ?? []
            }
          />
        </Grid>
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={ManageStudentsColumns}
          rows={parseStudentListing(
            filteredStudents?.studentList ?? data?.studentList,
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
          acceptedFiles=".xlsx"
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
        <AddStudentTeacher
          state={state}
          schema={state.isEditMode ? EditStudentSchema : AddStudentSchema}
          initialValues={initialValues}
          campusesData={campusesData?.data ?? []}
          handleAddUser={handleAddUser}
          editValues={state.selectedRecord}
          handleModal={() => handleModal("addNewModalIsOpen")}
          title={state.isEditMode ? "Edit Student" : "Add Student"}
          fields={
            state.isEditMode
              ? AddStudentFields(
                  campusesData?.data
                    ? campusesData?.data?.map((item) => item?.campusName)
                    : [],
                  state.isEditMode
                ).filter((field) => field.name !== "password")
              : AddStudentFields(
                  campusesData?.data
                    ? campusesData?.data?.map((item) => item?.campusName)
                    : []
                )
          }
        />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          disabled={state.isLoading}
          handleAction={handleDeleteUser}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default ManageStudents;
