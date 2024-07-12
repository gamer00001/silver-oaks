import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import InputField from "@/components/common/InputField";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { OGAColumns } from "@/constants/table-constants";
import { parseOgaListing } from "@/parsers/student-parser";
import {
  deleteOGAFromApi,
  getOnGoingAssignmentsByCourseListing,
} from "@/store/actions/ogaActions";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AdminOGA = () => {
  const [state, setState] = useState({
    isLoading: false,
    page: 0,
    size: 10,
    totalPages: 1,
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
  });

  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const {
    ogaListingByCourseData: { data, loading },
  } = useSelector((s) => s.ogaReducer);

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
      selectedRecord: selectedRecord,
    }));
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    handleLoader();

    dispatch(
      deleteOGAFromApi({
        payload: {
          query: {
            ogaId: selectedRecord?.ogaId,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          toast.success("Deleted Successfully!");
          handleLoader();
          fetchListing();
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const fetchListing = () => {
    const { page, size } = state;
    const queryPage = search.split("=")[1];

    const queryParams = `?page=${
      queryPage ? queryPage - 1 : page
    }&size=${size}`;

    dispatch(
      getOnGoingAssignmentsByCourseListing({
        payload: {
          query: {
            // page:,
            // size,
            courseId,
            queryParams,
          },
          dispatch,
        },
        onSuccess: (res) => {
          setState((prev) => ({
            ...prev,
            page: res.ogaPagination?.number,
            totalPages: res.ogaPagination?.totalPages,
          }));
        },
      })
    );
  };

  useEffect(() => {
    fetchListing();
    // fetchCompusListing(dispatch);
  }, [search]);

  if (loading || state.isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button
          size="large"
          variant="secondary"
          onClick={() => navigate("add-new")}
        >
          Add New OGA
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField icon="/search-icon.svg" />
        </Grid>
        <Grid item md={3} />

        {/* <Grid item md={3}>
          <Dropdown placeholder="Published Date" options={options} />
        </Grid> */}
      </Grid>

      <div className="p-12">
        <CustomTable
          page={state.page + 1}
          totalPages={state.totalPages}
          columns={OGAColumns}
          rows={parseOgaListing(
            data?.ogaPagination?.content ?? [],
            handleModal,
            navigate
          )}
        />
      </div>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[45.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={state.deleteModalIsOpen}
        onClose={() => handleModal("deleteModalIsOpen")}
      >
        <DeleteActionModal
          handleAction={handleDelete}
          handleModal={() => handleModal("deleteModalIsOpen")}
        />
      </ModalTop>
    </div>
  );
};

export default AdminOGA;
