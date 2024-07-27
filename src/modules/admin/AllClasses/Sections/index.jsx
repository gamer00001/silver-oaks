import { Loader, ModalTop } from "@/components/common";
import CourseBlock from "@/components/common/CourseBlock";
import AddNewClass from "@/components/modals/AddNewClass";
import DeleteActionModal from "@/components/modals/DeleteAction";
import {
  deleteSection,
  editSection,
  fetchSectionsByCampus,
} from "@/store/actions/commonActions";
import { fetchCompusListing } from "@/utils/common-api-helper";
import { CoursesColors } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SectionPage = () => {
  const [state, setState] = useState({
    editModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { gradeId, campusId, campusName } = useParams();
  const dispatch = useDispatch();

  const {
    sectionsData: { data, loading },
  } = useSelector((s) => s.commonReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  const handleModal = (key = "editModalIsOpen", selectedRecord) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
      selectedRecord: selectedRecord,
    }));
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

  const handleEditSection = (formValues) => {
    const campusId = campusesData.data.find(
      (item) => item.campusName === formValues.campus
    )?.id;

    const payload = {
      id: state.selectedRecord.id,
      campusId: campusId,
      grade: formValues?.grade,
      sectionName: formValues.name,
    };

    dispatch(
      editSection({
        payload: {
          query: {
            sectionId: state.selectedRecord.id,
          },
          body: payload,
        },
        onSuccess: (resp) => {
          handleModal("editModalIsOpen");
          fetchAllSectionsByGrade();
          toast.success("Section updated successfully!");
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    handleModal("deleteModalIsOpen");

    dispatch(
      deleteSection({
        payload: {
          query: {
            sectionId: selectedRecord?.id,
          },
          dispatch,
        },
        onSuccess: () => {
          toast.success("Deleted Successfully!");
          fetchAllSectionsByGrade();
        },
        onError: (error) => {
          handleError(error);
        },
      })
    );
  };

  useEffect(() => {
    fetchAllSectionsByGrade();
    fetchCompusListing(dispatch);
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
              showEditIcon={true}
              showDeleteIcon={true}
              heading={campusName}
              titleFontSize="text-5xl"
              title={item.sectionName}
              headingFontSize="text-2xl"
              data={CoursesColors[index]}
              textColor={CoursesColors[index]?.textColor}
              bgColor={CoursesColors[index]?.backgroundColor}
              handleDeleteAction={() => handleModal("deleteModalIsOpen", item)}
              handleEditAction={() => handleModal("editModalIsOpen", item)}
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
        open={state.editModalIsOpen}
        onClose={() => handleModal("editModalIsOpen")}
      >
        <AddNewClass
          title="Edit"
          option="Section"
          //   fields={AddStudentFields()}
          //   handleAddCampus={handleAddCampus}
          handleAddSection={handleEditSection}
          editValues={{
            ...state.selectedRecord,
            name: state.selectedRecord?.sectionName,
            campus: campusesData?.data?.find(
              (item) => item?.id === state?.selectedRecord?.campusId
            )?.campusName,
          }}
          handleModal={() => handleModal("editModalIsOpen")}
          campusesOptions={
            campusesData?.data?.map((item) => item?.campusName) ?? []
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
          handleAction={handleDelete}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default SectionPage;
