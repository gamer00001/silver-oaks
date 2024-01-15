import { GroupBookingFormModal } from "@/components/FormModal";
import {
  Loader,
  MyPagination,
  NoResultFound,
  TableMenu,
  Td,
  Th,
  Tr,
} from "@/components/common";
import { useQueryParams } from "@/hooks";
import { deleteGroupBooking, getAllGroupBookings } from "@/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ApplicationsGroup = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllGroupBookingsData, deleteGroupBookingData } = useSelector(
    (s) => s.groupApplicationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroupBookings({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="px-[1.7rem] pb-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
        <div className="grid gap-[.267rem]">
          <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
            Group Tour Applications
          </h2>
          <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        {(getAllGroupBookingsData?.loading ||
          deleteGroupBookingData?.loading) && <Loader type="screen-bg" />}

        {getAllGroupBookingsData?.data?.length === 0 &&
          !(
            getAllGroupBookingsData?.loading || deleteGroupBookingData?.loading
          ) && <NoResultFound />}

        {getAllGroupBookingsData?.data?.length !== 0 && (
          <>
            <div className="grid grid-cols-1 w-full">
              <Table />
            </div>

            <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
              <MyPagination
                page={page}
                totalPages={getAllGroupBookingsData?.totalPages || 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsGroup;

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const { getAllGroupBookingsData } = useSelector(
    (s) => s.groupApplicationReducer
  );

  return (
    <>
      <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
        <thead className="grid grid-cols-1 w-full">
          <Tr className="grid-cols-[minmax(15rem,1fr)_minmax(15rem,1fr)_minmax(20rem,1fr)_minmax(20rem,1fr)_10rem_repeat(3,15rem)_1.9rem]">
            <Th textLeftAlign>First Name</Th>
            <Th textLeftAlign>Last Name</Th>
            <Th textLeftAlign>Phone No</Th>
            <Th textLeftAlign>Email</Th>
            <Th>Prefer By</Th>
            <Th>Travel Package</Th>
            <Th>Payment Status</Th>
            <Th>Tour Status</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody className="grid grid-cols-1 w-full">
          {getAllGroupBookingsData?.data?.map((g, i) => (
            <TableRow
              key={i}
              firstName={g?.firstName || ""}
              lastName={g?.lastName || ""}
              email={g?.email || ""}
              phone={g?.phone || ""}
              preferBy={g?.preferBy || ""}
              tourStatus={g?.status || ""}
              travelPackage="Standard"
              isPaid={g?.paymentStatus === "PAID"}
              initialValues={g}
              onDelete={() =>
                dispatch(
                  deleteGroupBooking({
                    payload: { _id: g?._id },
                    onSuccess: () => {
                      toast.success("Successfully deleted!");
                      dispatch(
                        getAllGroupBookings({ payload: { page, query } })
                      );
                    },
                  })
                )
              }
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const TableRow = ({
  isPaid = false,
  firstName,
  lastName,
  preferBy,
  phone,
  email,
  travelPackage,
  tourStatus,
  onDelete,
  initialValues,
}) => {
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Tr className="pt-[1.9rem] grid-cols-[minmax(15rem,1fr)_minmax(15rem,1fr)_minmax(20rem,1fr)_minmax(20rem,1fr)_10rem_repeat(3,15rem)_1.9rem]">
        <Td textLeftAlign>{firstName || "--"}</Td>
        <Td textLeftAlign>{lastName || "--"}</Td>
        <Td textLeftAlign>{phone || "--"}</Td>
        <Td textLeftAlign>{email || "--"}</Td>
        <Td className="capitalize">{preferBy || "--"}</Td>
        <Td>{travelPackage || "--"}</Td>
        <Td
          className={`${
            isPaid ? "text-green-400" : "text-red-400"
          } font-semibold`}
        >
          {isPaid ? "Paid" : "UnPaid"}
        </Td>
        <Td
          className={`font-semibold ${
            tourStatus === "Active"
              ? "text-custom-dark-gren"
              : tourStatus === "Retention"
              ? "text-[#EE6C4D]"
              : "text-[#4285F4]"
          }`}
        >
          {tourStatus || "--"}
        </Td>
        <td>
          <TableMenu
            onView={() => setIsViewing(true)}
            onEdit={() => setIsEditing(true)}
            onDelete={onDelete}
          />
        </td>
      </Tr>

      <GroupBookingFormModal
        onClose={() => setIsViewing(false)}
        open={isViewing}
        initialValues={initialValues}
        disabled
      />
      <GroupBookingFormModal
        onClose={() => setIsEditing(false)}
        open={isEditing}
        initialValues={initialValues}
      />
    </>
  );
};
