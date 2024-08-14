import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import GradeBlock from "@/components/common/GradeBlock";
import AddNewClass from "@/components/modals/AddNewClass";
import { addCampus, addSection } from "@/store/actions/commonActions";
import { fetchCompusListing } from "@/utils/common-api-helper";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import garde1 from "../../../assets/common/grade1.png";
import garde10 from "../../../assets/common/grade10.png";
import garde2 from "../../../assets/common/grade2.png";
import garde3 from "../../../assets/common/grade3.png";
import garde4 from "../../../assets/common/grade4.png";
import garde5 from "../../../assets/common/grade5.png";
import garde6 from "../../../assets/common/grade6.png";
import garde7 from "../../../assets/common/grade7.png";
import garde8 from "../../../assets/common/grade8.png";
import garde9 from "../../../assets/common/grade9.png";
import CampusesPage from "./Campuses";
import TabsComponent from "./TabView";
import { isEmpty, isNil } from "lodash";
import { convertObjectToQueryString } from "@/utils";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

export const MOCK_GRADES = (campusName = "", campusId) => [
  {
    id: 1,
    title: "Grade I",
    subtitle: campusName,
    image: garde1,
    route: `/all-classes/grade/I/${campusName}/${campusId}`,
  },
  {
    id: 2,
    title: "Grade II",
    subtitle: campusName,
    image: garde2,
    route: `/all-classes/grade/II/${campusName}/${campusId}`,
  },
  {
    id: 3,
    title: "Grade III",
    subtitle: campusName,
    image: garde3,
    route: `/all-classes/grade/III/${campusName}/${campusId}`,
  },
  {
    id: 4,
    title: "Grade IV",
    subtitle: campusName,
    image: garde4,
    route: `/all-classes/grade/IV/${campusName}/${campusId}`,
  },
  {
    id: 5,
    title: "Grade V",
    image: garde5,
    subtitle: campusName,
    route: `/all-classes/grade/V/${campusName}/${campusId}`,
  },

  {
    id: 6,
    title: "Grade VI",
    image: garde6,
    subtitle: campusName,
    route: `/all-classes/grade/VI/${campusName}/${campusId}`,
  },
  {
    id: 7,
    title: "Grade VII",
    image: garde7,
    subtitle: campusName,
    route: `/all-classes/grade/VII/${campusName}/${campusId}`,
  },
  {
    id: 8,
    title: "Grade VIII",
    image: garde8,
    subtitle: campusName,
    route: `/all-classes/grade/VIII/${campusName}/${campusId}`,
  },
  {
    id: 9,
    title: "Grade IX",
    image: garde9,
    subtitle: campusName,
    route: `/all-classes/grade/IX/${campusName}/${campusId}`,
  },
  {
    id: 10,
    image: garde10,
    title: "Grade X",
    subtitle: campusName,
    route: `/all-classes/grade/X/${campusName}/${campusId}`,
  },
];

const AllClasses = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectionCampus: null,
    currentTab: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { campusesData } = useSelector((s) => s.commonReducer);

  const handleModal = (key = "deleteModalIsOpen") => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTabChange = (event, newValue) => {
    setState((prev) => ({
      ...prev,
      currentTab: newValue,
    }));
  };

  const updateUrlBasedOnCampus = (selectedCampus) => {
    const newUrl = new URL(window.location);
    const params = new URLSearchParams(newUrl.search);
    params.set("campus", selectedCampus);
    newUrl.search = params.toString();
    window.history.pushState({}, "", newUrl);
  };

  const fetchCampusValue = () => {
    const selectedCampus =
      state?.selectionCampus ??
      (!isNil(campusesData?.data) && !campusesData.loading)
        ? campusesData?.data[0]?.campusName
        : "";

    return selectedCampus;
  };

  const fetchSelectCampusInfo = (selectedCampus = "") => {
    return campusesData?.data?.find(
      (item) => item.campusName === selectedCampus
    );
  };

  const handleCampusDropdown = (selectionOption) => {
    updateUrlBasedOnCampus(selectionOption);

    setState((prev) => ({
      ...prev,
      selectionCampus: selectionOption,
    }));
  };

  const handleAddCampus = (formValues) => {
    const payload = {
      campusName: formValues.name,
    };
    dispatch(
      addCampus({
        payload: {
          body: payload,
        },
        onSuccess: (resp) => {
          handleModal("addNewModalIsOpen");
          fetchCompusListing(dispatch);
          toast.success("Campus added successfully!");
        },
        onError: () => {
          handleModal("addNewModalIsOpen");
          toast.error("Some Error Occured!");
        },
      })
    );
  };

  const handleAddSection = (formValues) => {
    const campusId = campusesData.data.find(
      (item) => item.campusName === formValues.campus
    )?.id;

    const payload = {
      campusId: campusId,
      grade: formValues?.grade,
      sectionName: formValues.name,
    };

    dispatch(
      addSection({
        payload: {
          query: {
            campusId,
          },
          body: payload,
        },
        onSuccess: (resp) => {
          // fetchListing();
          handleModal("addNewModalIsOpen");
          fetchCompusListing(dispatch);

          toast.success("Section added successfully!");
        },
        onError: () => {
          handleModal("addNewModalIsOpen");
          toast.error("Some Error Occured!");
        },
      })
    );
  };

  const GradeTabView = () => {
    return (
      <>
        <Grid container spacing={4} className="px-12 py-12">
          <Grid item sm={3} md={3} lg={2}>
            <Dropdown
              placeholder="Campus"
              onChange={handleCampusDropdown}
              value={state.selectionCampus ?? fetchCampusValue()}
              options={
                campusesData?.data?.map((item) => item?.campusName) ?? []
              }
            />
          </Grid>
          <Grid item sm={3} md={2} lg={4} />
        </Grid>
        <Grid container spacing={6} className="p-12 flex">
          {MOCK_GRADES(
            state.selectionCampus ?? fetchCampusValue(),
            fetchSelectCampusInfo(state.selectionCampus ?? fetchCampusValue())
              ?.id
          ).map((grade) => (
            <Grid item lg={4} key={grade.id}>
              <GradeBlock onClick={() => navigate(grade.route)} {...grade} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const prepopulateCampus = () => {
    // const searchParams = window.location?.search;

    const searchParams = new URLSearchParams(window.location.search);

    const campus = searchParams.get("campus");

    if (!isEmpty(campus)) {
      setState((prev) => ({
        ...prev,
        selectionCampus: campus,
      }));
    }
  };

  const CampusTabView = () => {
    return <CampusesPage campuses={campusesData.data} />;
  };

  useEffect(() => {
    fetchCompusListing(dispatch);

    prepopulateCampus();
  }, []);

  if (campusesData?.loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end pr-12">
        <Button
          variant="secondary"
          size="large"
          onClick={() => handleModal("addNewModalIsOpen")}
        >
          Add New
        </Button>
      </div>

      <TabsComponent
        currentTab={state.currentTab}
        handleTabChange={handleTabChange}
        tabs={[
          {
            label: "Grades",
            content: GradeTabView(),
          },
          {
            label: "Campuses",
            content: CampusTabView(),
          },
        ]}
      />

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[75.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.addNewModalIsOpen}
        onClose={() => handleModal("addNewModalIsOpen")}
      >
        <AddNewClass
          // fields={AddStudentFields()}
          handleAddCampus={handleAddCampus}
          handleAddSection={handleAddSection}
          handleModal={() => handleModal("addNewModalIsOpen")}
          campusesOptions={
            campusesData?.data?.map((item) => item?.campusName) ?? []
          }
        />
      </ModalTop>

      {/* {campusesData.loading && <Loader type={"screen"} />} */}
    </div>
  );
};

export default AllClasses;
