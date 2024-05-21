import { fetchCampuses } from "@/store/actions/commonActions";

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
