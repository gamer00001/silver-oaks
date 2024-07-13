import { Loader } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import InputField from "@/components/common/InputField";
import {
  ManageAnnouncementsColumns,
  StudentByCourseColumns,
} from "@/constants/table-constants";
import {
  MockExamData,
  studentByCourseListingParser,
} from "@/parsers/student-parser";
import { fetchStudentsListing } from "@/store/actions/studentActions";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AdminAnnouncements = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { courseId, courseName, sectionName, campusName, gradeId } =
    useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { studentsListing } = useSelector((s) => s.studentReducer);

  console.log({ studentsListing });

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
    const queryParams = `&section=${sectionName}`;
    dispatch(
      fetchStudentsListing({
        payload: {
          query: {
            page: 0,
            size: 500,
            campus: campusName,
            queryParams,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    fetchListing();
    // fetchCompusListing(dispatch);
  }, []);

  if (studentsListing.loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      {/* <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="secondary"
          onClick={() => navigate("add-new")}
        >
          Add New Exam
        </Button>
      </div> */}

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField icon="/search-icon.svg" />
        </Grid>
        <Grid item md={3} />
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={ManageAnnouncementsColumns}
          rows={studentByCourseListingParser(
            studentsListing?.data?.studentPage?.content ?? []
          )}
        />
      </div>

      {/* <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleAction={handleDelete}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop> */}
    </div>
  );
};

export default AdminAnnouncements;
