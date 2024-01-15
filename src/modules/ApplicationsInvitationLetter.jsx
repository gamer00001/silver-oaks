import { InvitationLetterBookingFormModal } from "@/components/FormModal";
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
import { deleteInvitationLetter, getAllInvitationLetter } from "@/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ApplicationsInvitationLetter = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllInvitationLetterData, deleteInvitationLetterData } =
    useSelector((s) => s.invitationLetterApplicationReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInvitationLetter({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="px-[1.7rem] pb-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
        <div className="grid gap-[.267rem]">
          <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
            Invitation Letter Applications
          </h2>
          <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        {(getAllInvitationLetterData?.loading ||
          deleteInvitationLetterData?.loading) && <Loader type="screen-bg" />}

        {getAllInvitationLetterData?.data?.length === 0 &&
          !(
            getAllInvitationLetterData?.loading ||
            deleteInvitationLetterData?.loading
          ) && <NoResultFound />}

        {getAllInvitationLetterData?.data?.length !== 0 && (
          <>
            <div className="grid grid-cols-1 w-full">
              <Table />
            </div>

            <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
              <MyPagination
                page={page}
                totalPages={getAllInvitationLetterData?.totalPages || 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsInvitationLetter;

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const { getAllInvitationLetterData } = useSelector(
    (s) => s.invitationLetterApplicationReducer
  );

  return (
    <>
      <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
        <thead className="grid grid-cols-1 w-full">
          <Tr className="grid-cols-[repeat(4,minmax(15rem,1fr))_10rem_15rem_13rem_20rem_12rem_1.9rem]">
            <Th textLeftAlign>First Name</Th>
            <Th textLeftAlign>Last Name</Th>
            <Th textLeftAlign>Phone No</Th>
            <Th textLeftAlign>Email</Th>
            <Th>Package</Th>
            <Th>Type Of Visa</Th>
            <Th>Port of Entry</Th>
            <Th>No. of Addon Services</Th>
            <Th>Payment Status</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody className="grid grid-cols-1 w-full">
          {getAllInvitationLetterData?.data?.map((invi, i) => (
            <TableRow
              key={i}
              firstName={invi?.firstName || "--"}
              lastName={invi?.lastName || "--"}
              email={invi?.email || "--"}
              phone={invi?.phone || "--"}
              isPaid={invi?.paymentStatus === "PAID"}
              NoofAddonServices={invi?.addOnServices?.length || 0}
              packageType={invi?.package || "--"}
              portOfEntry={invi?.portOfEntry || "--"}
              typeOfVisa={invi?.visaType || "--"}
              initialValues={invi}
              onDelete={() =>
                dispatch(
                  deleteInvitationLetter({
                    payload: { _id: invi?._id },
                    onSuccess: () => {
                      toast.success("Successfully deleted!");
                      dispatch(
                        getAllInvitationLetter({ payload: { page, query } })
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
  phone,
  email,
  packageType,
  NoofAddonServices,
  typeOfVisa,
  portOfEntry,
  onDelete,
  initialValues,
}) => {
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Tr className="pt-[1.9rem] grid-cols-[repeat(4,minmax(15rem,1fr))_10rem_15rem_13rem_20rem_12rem_1.9rem]">
        <Td textLeftAlign>{firstName || "--"}</Td>
        <Td textLeftAlign>{lastName || "--"}</Td>
        <Td textLeftAlign>{phone || "--"}</Td>
        <Td textLeftAlign>{email || "--"}</Td>
        <Td>{packageType || "--"}</Td>
        <Td>{typeOfVisa || "--"}</Td>
        <Td>{portOfEntry || "--"}</Td>
        <Td>{NoofAddonServices || "--"}</Td>
        <Td
          className={`${
            isPaid ? "text-green-400" : "text-red-400"
          } font-semibold`}
        >
          {isPaid ? "Paid" : "UnPaid"}
        </Td>
        <td>
          <TableMenu
            onView={() => setIsViewing(true)}
            onEdit={() => setIsEditing(true)}
            onDelete={onDelete}
          />
        </td>
      </Tr>

      <InvitationLetterBookingFormModal
        onClose={() => setIsViewing(false)}
        open={isViewing}
        initialValues={initialValues}
        disabled
      />
      <InvitationLetterBookingFormModal
        onClose={() => setIsEditing(false)}
        open={isEditing}
        initialValues={initialValues}
      />
    </>
  );
};
