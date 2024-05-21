import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CourseBlock from "@/components/common/CourseBlock";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import { AddCourseFields } from "@/constants/forms";
import { AddCourseSchema } from "@/schema";
import {
  addCourse,
  deleteCourse,
  getAllCoursesByGrade,
} from "@/store/actions/coursesActions";
import { CoursesColors } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  });

  const { gradeId } = useParams();
  const dispatch = useDispatch();

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
    let payload = {
      courseName: values.name,
      description: values.description,
      grade: gradeId,
      credits: values.credits,
    };

    dispatch(
      addCourse({
        payload: {
          body: payload,
          dispatch,
        },
        onSuccess: () => {
          fetchAllCoursesByGrade();
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

  const handleDeleteCourse = (courseId) => {
    dispatch(
      deleteCourse({
        payload: {
          query: {
            courseId,
          },
          dispatch,
        },
        onSuccess: () => {
          fetchAllCoursesByGrade();
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
          <p className="text-black font-semibold text-6xl">{`All Classes > Grade ${gradeId}`}</p>
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
          data?.courseList?.map((item, index) => (
            <CourseBlock
              key={index}
              width="w-full"
              height="h-72"
              bookIcon="w-40"
              titleFontSize="text-5xl"
              headingFontSize="text-2xl"
              title={item?.courseName}
              showDeleteIcon={true}
              heading={`Grade ${item?.grade}`}
              data={CoursesColors[index]}
              handleDeleteAction={() => handleDeleteCourse(item.courseId)}
              link={`/all-classes/grade/${gradeId}/${item?.courseName}/${item?.courseId}/lectures`}
              bgColor={CoursesColors[index]?.backgroundColor}
              textColor={CoursesColors[index]?.textColor}
              {...item}
            />
          ))
        ) : (
          <div className="font-semibold text-3xl pt-10">No Courses Found!</div>
        )}
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[59.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <AddStudentTeacher
          title={"Add Course"}
          subtitle="Teacher Details"
          fields={AddCourseFields() ?? []}
          handleAddUser={handleAddCourse}
          initialValues={initialValues}
          schema={AddCourseSchema}
          editValues={state.selectedRecord}
          handleModal={() => handleModal("addNewModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default GradePage;
