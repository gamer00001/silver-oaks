import {
  fetchCampuses,
  fetchSectionsByCampus,
} from "@/store/actions/commonActions";

export const fetchCompusListing = (dispatch) => {
  dispatch(
    fetchCampuses({
      payload: {
        query: {
          page: 0,
          size: 500,
        },
        dispatch,
      },
    })
  );
};

export const fetchSectonsListing = (dispatch, campusId, grade) => {
  dispatch(
    fetchSectionsByCampus({
      payload: {
        query: {
          campusId,
          grade,
        },
        dispatch,
      },
    })
  );
};
