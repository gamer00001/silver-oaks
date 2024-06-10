import { Loader, ModalTop } from "@/components/common";
import Button from "@/components/common/Button";
import CustomTable from "@/components/common/CustomTable";
import Dropdown from "@/components/common/Dropdown";
import InputField from "@/components/common/InputField";
import DeleteActionModal from "@/components/modals/DeleteAction";
import { QuizzColumns } from "@/constants/table-constants";
import { parseQuizzesListing } from "@/parsers/student-parser";
import {
  deleteQuizApi,
  getQuizzesByCourseId,
} from "@/store/actions/quizzesActions";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const AdminQuizzes = () => {
  const [state, setState] = useState({
    addNewModalIsOpen: false,
    deleteModalIsOpen: false,
    selectedRecord: {},
    isEditMode: false,
    isLoading: false,
  });

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    quizzesDataByCourse: { data, loading },
  } = useSelector((s) => s.quizReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

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

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const handleDelete = () => {
    const { selectedRecord } = state;

    handleLoader(true);

    dispatch(
      deleteQuizApi({
        payload: {
          query: {
            quizId: selectedRecord?.quizId,
          },
        },
        onSuccess: (resp) => {
          handleModal("deleteModalIsOpen");
          toast.success("Deleted Successfully!");
          fetchListing();
          handleLoader(false);
        },
        onError: () => {
          handleLoader(false);
          toast.error("Some Error Occured!");
        },
      })
    );
  };

  const fetchListing = () => {
    dispatch(
      getQuizzesByCourseId({
        payload: {
          query: {
            page: 0,
            size: 500,
            courseId,
          },
          dispatch,
        },
      })
    );
  };

  const handleAddNewQuiz = () => {
    navigate("add-new");
  };

  useEffect(() => {
    fetchListing();

    // fetchCompusListing(dispatch);
  }, []);

  if (loading || state.isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full">
      <div className="flex justify-end gap-12 pr-12">
        <Button size="large" variant="secondary" onClick={handleAddNewQuiz}>
          Add New Quiz
        </Button>
      </div>

      <Grid container spacing={4} className="px-12 py-12">
        <Grid item md={6}>
          <InputField icon="/search-icon.svg" />
        </Grid>
        <Grid item md={3} />

        <Grid item md={3}>
          <Dropdown placeholder="Published Date" options={options} />
        </Grid>
      </Grid>

      <div className="p-12">
        <CustomTable
          columns={QuizzColumns}
          rows={parseQuizzesListing(data?.quizList, handleModal, navigate)}
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

export default AdminQuizzes;
