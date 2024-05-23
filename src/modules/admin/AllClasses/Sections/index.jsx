import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CourseBlock from "@/components/common/CourseBlock";
import AddStudentTeacher from "@/components/modals/AddStudentTeacher";
import { AddCourseFields } from "@/constants/forms";
import { AddCourseSchema } from "@/schema";
import { fetchSectionsByCampus } from "@/store/actions/commonActions";
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

const SectionPage = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { gradeId, campusId, campusName } = useParams();
  const dispatch = useDispatch();

  const {
    sectionsData: { data, loading },
  } = useSelector((s) => s.commonReducer);

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

  const fetchAllSectionsByGrade = () => {
    dispatch(
      fetchSectionsByCampus({
        payload: {
          query: {
            campusId,
            grade: `Grade ${gradeId}`,
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
          fetchAllSectionsByGrade();
        },
      })
    );
  };

  useEffect(() => {
    fetchAllSectionsByGrade();
  }, [gradeId]);

  if (loading) {
    return <Loader type="screen" />;
  }

  return (
    <div className="px-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-black font-semibold text-5xl">{`All Classes > Grade ${gradeId} > Campus ${campusName}`}</p>
          <p className="text-black font-semibold text-3xl pt-8">All Sections</p>
        </div>
      </div>

      <div className="gap-12 pt-12 grid grid-cols-3 w-full">
        {data?.length > 0 ? (
          data?.map((item, index) => (
            <CourseBlock
              key={index}
              width="w-full"
              height="h-72"
              bookIcon="w-40"
              titleFontSize="text-5xl"
              headingFontSize="text-2xl"
              title={item.sectionName}
              showDeleteIcon={false}
              heading={campusName}
              data={CoursesColors[index]}
              handleDeleteAction={() => handleDeleteCourse(item.courseId)}
              bgColor={CoursesColors[index]?.backgroundColor}
              textColor={CoursesColors[index]?.textColor}
              link={`/all-classes/grade/${gradeId}/${campusName}/${campusId}/${item.sectionName}/${item.id}`}
              {...item}
            />
          ))
        ) : (
          <div className="font-semibold text-3xl pt-10">No Sections Found!</div>
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

export default SectionPage;
