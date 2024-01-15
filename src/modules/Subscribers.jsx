import { Download } from "@/assets/Icons";
import {
  Loader,
  MyPagination,
  NoResultFound,
  TableMenu,
  Td,
  Th,
  Tr,
} from "@/components/common";
import { CONSTANTS } from "@/constants";
import { useQueryParams } from "@/hooks";
import {
  deleteSubscription,
  exportSubscription,
  getAllSubscriptions,
} from "@/store";
import { useCallback } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";

const Subscribers = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const {
    getAllSubscriptionsData,
    deleteSubscriptionData,
    exportSubscriptionData,
  } = useSelector((s) => s.subscriptionReducer);

  const handleDownloadAll = useCallback(() => {
    dispatch(
      exportSubscription({
        onSuccess: ({ fileName }) =>
          window.open(
            `${CONSTANTS.VITE_BACKEND_SUBSCRIPTION_EXPORT_URL}/${fileName}`,
            "_blank"
          ),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSubscriptions({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="px-[1.7rem] pb-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.8rem]">
        <div className="grid grid-cols-[1fr_auto] gap-[3rem] content-start">
          <div className="grid gap-[1.6rem]">
            <h1 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
              List of Email Subscriber
            </h1>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Offer some useful tips and advice for visitors to the Falcon Club
              Tourist page
            </p>
          </div>

          <div>
            <button
              onClick={handleDownloadAll}
              className="grid grid-cols-[auto_auto] gap-[.8rem] items-center opacity"
            >
              <span className="grid-center text-black text-[2.4rem]">
                <Download />
              </span>
              <span className="text-black whitespace-nowrap text-[1.6rem] font-medium leading-[120%]">
                Download all
              </span>
            </button>
          </div>
        </div>

        {getAllSubscriptionsData?.data?.length === 0 &&
          !(
            getAllSubscriptionsData?.loading ||
            deleteSubscriptionData?.loading ||
            exportSubscriptionData?.loading
          ) && <NoResultFound />}

        <div className="grid gap-[1.9rem] max-w-[69.3rem]">
          {(getAllSubscriptionsData?.loading ||
            deleteSubscriptionData?.loading ||
            exportSubscriptionData?.loading) && <Loader type="screen-bg" />}

          {getAllSubscriptionsData?.data?.length !== 0 && (
            <>
              <div className="grid grid-cols-1 w-full">
                <Table />
              </div>

              <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
                <MyPagination
                  page={page}
                  totalPages={getAllSubscriptions?.totalPages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribers;

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllSubscriptionsData } = useSelector((s) => s.subscriptionReducer);
  const dispatch = useDispatch();

  const handleDelete = useCallback(
    (_id) => {
      dispatch(
        deleteSubscription({
          payload: { _id },
          onSuccess: () => {
            dispatch(getAllSubscriptions({ payload: { page, query } }));
            toast.success("Successfully deleted!");
          },
        })
      );
    },
    [dispatch, page, query]
  );

  return (
    <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
      <thead className="grid grid-cols-1 w-full">
        <Tr className="grid-cols-[repeat(2,minmax(20rem,1fr))_1.9rem]">
          <Th textLeftAlign>Phone</Th>
          <Th textLeftAlign>Email</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody className="grid grid-cols-1 w-full">
        {getAllSubscriptionsData?.data?.map((s, i) => (
          <TableRow
            phone={!isEmail(s?.contact) ? s?.contact : "--"}
            email={isEmail(s?.contact) ? s?.contact : "--"}
            key={i}
            onDelete={() => handleDelete(s?._id)}
          />
        ))}
      </tbody>
    </table>
  );
};

const TableRow = ({ phone, email, onDelete }) => {
  return (
    <Tr className="pt-[1.9rem] grid-cols-[repeat(2,minmax(20rem,1fr))_1.9rem]">
      <Td textLeftAlign>{phone || "--"}</Td>
      <Td textLeftAlign>{email || "--"}</Td>
      <td>
        <TableMenu onDelete={onDelete} />
      </td>
    </Tr>
  );
};
