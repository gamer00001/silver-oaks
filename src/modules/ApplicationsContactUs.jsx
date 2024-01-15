import { ContactUsFormModal } from "@/components/FormModal";
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
import { deleteContactUs, getAllContactUs } from "@/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ApplicationsContactUs = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllContactUsData, deleteContactUsData } = useSelector(
    (s) => s.contactUsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactUs({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="px-[1.7rem] pb-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
        <div className="grid gap-[.267rem]">
          <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
            Contact Us Applications
          </h2>
          <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        {(getAllContactUsData?.loading || deleteContactUsData?.loading) && (
          <Loader type="screen-bg" />
        )}

        {getAllContactUs?.data?.length === 0 &&
          !(getAllContactUsData?.loading || deleteContactUsData?.loading) && (
            <NoResultFound />
          )}

        {getAllContactUs?.data?.length !== 0 && (
          <>
            <div className="grid grid-cols-1 w-full">
              <Table />
            </div>

            <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
              <MyPagination
                page={page}
                totalPages={getAllContactUsData?.totalPages || 0}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsContactUs;

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllContactUsData } = useSelector((s) => s.contactUsReducer);
  const dispatch = useDispatch();

  return (
    <>
      <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
        <thead className="grid grid-cols-1 w-full">
          <Tr className="grid-cols-[repeat(3,minmax(15rem,1fr))minmax(15rem,3fr)_1.9rem]">
            <Th textLeftAlign>Name</Th>
            <Th textLeftAlign>Email</Th>
            <Th textLeftAlign>Contact Number</Th>
            <Th textLeftAlign>Message</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody className="grid grid-cols-1 w-full">
          {getAllContactUsData?.data?.map((c, i) => (
            <TableRow
              key={i}
              name={c?.fullName || "--"}
              email={c?.email || "--"}
              phone={c?.phone || "--"}
              message={c?.message || "--"}
              onDelete={() =>
                dispatch(
                  deleteContactUs({
                    payload: { _id: c?._id },
                    onSuccess: () => {
                      dispatch(getAllContactUs({ payload: { page, query } }));
                      toast.success("Successfully deleted contact!");
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

const TableRow = ({ name, phone, email, message, onDelete }) => {
  const [isViewing, setIsViewing] = useState(false);

  return (
    <>
      <Tr className="pt-[1.9rem] grid-cols-[repeat(3,minmax(15rem,1fr))_minmax(15rem,3fr)_1.9rem]">
        <Td className="font-semibold" textLeftAlign>
          {name || "--"}
        </Td>
        <Td textLeftAlign>{email || "--"}</Td>
        <Td textLeftAlign>{phone || "--"}</Td>
        <Td textLeftAlign>{message || "--"}</Td>
        <td>
          <TableMenu onView={() => setIsViewing(true)} onDelete={onDelete} />
        </td>
      </Tr>

      <ContactUsFormModal
        onClose={() => setIsViewing(false)}
        open={isViewing}
        initialValues={{ fullName: name, phone, email, message }}
      />
    </>
  );
};
