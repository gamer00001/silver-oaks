import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CourseBlock from "@/components/common/CourseBlock";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { AddCourseFields } from "@/constants/forms";
import { AddCourseSchema } from "@/schema";
import {
  addCourse,
  deleteCourse,
  getAllCoursesByGrade,
  updateCourse,
} from "@/store/actions/coursesActions";
import { handleError } from "@/utils/errorHandling";
import { CoursesColors } from "@/utils/helper";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  credits: "",
};

const GradePage = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
    deleteModalIsOpen: false,
  });

  const { gradeId, campusName, campusId, sectionName, sectionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    coursesListing: { data, loading },
  } = useSelector((s) => s.courseReducer);

  const handleModal = (key = "addNewModalIsOpen", selectedRecord) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
      selectedRecord: selectedRecord,
    }));
  };

  const handleAddCourse = (values) => {
    const { isEditMode, selectedRecord } = state;

    let payload = {
      courseName: values.name,
      description: values.description,
      grade: gradeId,
      credits: values.credits,
    };

    handleModal();

    let apiToCall;

    if (!isEmpty(selectedRecord)) {
      apiToCall = updateCourse;
      payload = {
        ...payload,
        courseId: selectedRecord?.courseId,
      };
    } else {
      apiToCall = addCourse;
    }

    dispatch(
      apiToCall({
        payload: {
          body: payload,
          dispatch,
        },
        onSuccess: () => {
          toast.success("Course Added Successfully!");
          fetchAllCoursesByGrade();
        },
        onError: (error) => {
          handleError(error);
          // fetchAllCoursesByGrade();
        },
      })
    );
  };

  const fetchAllCoursesByGrade = () => {
    dispatch(
      getAllCoursesByGrade({
        payload: {
          query: {
            gradeId,
          },
          dispatch,
        },
      })
    );
  };

  const handleDeleteCourse = () => {
    const { selectedRecord } = state;

    handleModal("deleteModalIsOpen");

    dispatch(
      deleteCourse({
        payload: {
          query: {
            courseId: selectedRecord?.courseId,
          },
          dispatch,
        },
        onSuccess: () => {
          toast.success("Deleted Successfully!");
          fetchAllCoursesByGrade();
        },
        onError: (error) => {
          handleError(error);
        },
      })
    );
  };

  useEffect(() => {
    fetchAllCoursesByGrade();
  }, [gradeId]);

  if (loading) {
    return <Loader type="screen" />;
  }

  return (
    <div className="px-20">
      <div className="flex items-center justify-between">
        <div>
          {/* <p className="text-black font-semibold text-6xl">{`All Classes > Grade ${gradeId}`}</p> */}
          <p className="text-black font-semibold text-5xl">
            <span
              // onClick={() => window.history.back()}
              onClick={() => navigate(`/all-classes?campus=${campusName}`)}
              className="hover:underline cursor-pointer"
            >
              All Classes
            </span>
            {" > "}

            <span
              onClick={() =>
                navigate(
                  `/all-classes/grade/${gradeId}/${campusName}/${campusId}`
                )
              }
              className="hover:underline cursor-pointer"
            >{`Grade ${gradeId}`}</span>
            <span>{` > Campus (${campusName}) > `}</span>

            <span
            // onClick={() => navigate(-1)}
            // className="hover:underline cursor-pointer"
            >
              {`Section (${sectionName})`}
            </span>
          </p>
          <p className="text-black font-semibold text-3xl pt-4">All Subjects</p>
        </div>

        <div>
          <Button
            size="large"
            variant="secondary"
            onClick={() => handleModal("addNewModalIsOpen")}
          >
            Add New Course
          </Button>
        </div>
      </div>

      <div className="gap-12 pt-12 grid grid-cols-3 w-full">
        {data?.courseList ? (
          data?.courseList?.map((item, index) => {
            const colorIndex = index % CoursesColors.length;

            return (
              <CourseBlock
                key={index}
                width="w-full"
                height="h-72"
                bookIcon="w-40"
                titleFontSize="text-5xl"
                headingFontSize="text-2xl"
                title={item?.courseName}
                showDeleteIcon={true}
                showEditIcon
                heading={`Grade ${item?.grade}`}
                data={CoursesColors[colorIndex]}
                textColor={CoursesColors[colorIndex]?.textColor}
                bgColor={CoursesColors[colorIndex]?.backgroundColor}
                handleEditAction={() => handleModal("addNewModalIsOpen", item)}
                handleDeleteAction={() =>
                  handleModal("deleteModalIsOpen", item)
                }
                link={`/all-classes/grade/${gradeId}/${campusName}/${campusId}/${sectionName}/${sectionId}/${item?.courseName}/${item?.courseId}/lectures`}
                {...item}
              />
            );
          })
        ) : (
          <div className="font-semibold text-3xl pt-10">No Courses Found!</div>
        )}
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[59.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddStudentTeacher
          title={`${!isEmpty(state?.selectedRecord) ? "Edit" : "Add"} Course`}
          subtitle="Course Details"
          fields={AddCourseFields() ?? []}
          handleAddUser={handleAddCourse}
          initialValues={initialValues}
          schema={AddCourseSchema}
          editValues={{
            ...state.selectedRecord,
            name: state?.selectedRecord?.courseName,
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
          disabled={state.isLoading}
          handleAction={handleDeleteCourse}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default GradePage;
