import { PaymentGatewayFormModal } from "@/components/PaymentGateway";
import {
  Loader,
  MyPagination,
  NoResultFound,
  PageHeading,
  TableMenu,
  Td,
  Th,
  Tr,
} from "@/components/common";
import { useQueryParams } from "@/hooks";
import { checkPaymentStatus, deletePayment, getAllPayments } from "@/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentGateway = () => {
  const [open, setOpen] = useState(false);
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { getAllPaymentsData, deletePaymentData, checkPaymentStatusData } =
    useSelector((s) => s.paymentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPayments({ payload: { page, query } }));
  }, [dispatch, page, query]);

  return (
    <div className="grid gap-[2rem] grid-cols-1 pb-[1.7rem]">
      <PageHeading
        onClick={() => setOpen(true)}
        detail="Offer some useful tips and advice for visitors to the Falcon Club Tourist page"
        heading="Create New Payment Link"
      />

      <div className="px-[1.7rem]">
        <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr] gap-[3.4rem]">
          <div className="grid gap-[.267rem]">
            <h2 className="text-[#395556] text-[2.5rem] font-bold leading-[140%]">
              Payment Gateway
            </h2>
            <p className="text-[#A0AEC0] text-[1.6rem] leading-[150%]">
              Here are your existing payment links
            </p>
          </div>

          {getAllPaymentsData?.data?.length === 0 &&
            !(
              getAllPaymentsData?.loading ||
              deletePaymentData?.loading ||
              checkPaymentStatusData?.loading
            ) && <NoResultFound />}

          {(getAllPaymentsData?.loading ||
            deletePaymentData?.loading ||
            checkPaymentStatusData?.loading) && <Loader type="screen-bg" />}

          {getAllPaymentsData?.data?.length !== 0 && (
            <>
              <div className="grid grid-cols-1 w-full">
                <Table />
              </div>

              <div className="pt-[2rem] grid items-center justify-end grid-cols-[auto]">
                <MyPagination
                  page={page}
                  totalPages={getAllPaymentsData?.totalPages || 0}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <PaymentGatewayFormModal onClose={() => setOpen(false)} open={open} />
    </div>
  );
};

export default PaymentGateway;

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const { getAllPaymentsData } = useSelector((s) => s.paymentReducer);

  return (
    <>
      <table className="grid grid-cols-1 w-full overflow-auto scrollbar">
        <thead className="grid grid-cols-1 w-full">
          <Tr className="grid-cols-[17rem_8rem_17rem_31rem_minmax(25rem,1fr)_13rem_1.9rem]">
            <Th textLeftAlign>Name</Th>
            <Th>Amount</Th>
            <Th textLeftAlign>Phone</Th>
            <Th textLeftAlign>Order Id</Th>
            <Th textLeftAlign>Payment Link</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody className="grid grid-cols-1 w-full">
          {getAllPaymentsData?.data?.map((p, i) => (
            <TableRow
              key={i}
              name={p?.customerName || "--"}
              amount={
                p?.selectedPriceIn === "PKR"
                  ? `${p?.amount || "--"}PKR`
                  : `$${p?.amount || "--"}`
              }
              orderId={p?.orderId || "--"}
              paymentLink={p?.paymentURL || "--"}
              phone={p?.phone || "--"}
              isPaid={p?.paymentStatus === "PAID"}
              onDelete={() =>
                dispatch(
                  deletePayment({
                    payload: { _id: p?._id },
                    onSuccess: () => {
                      toast.success("Successfully deleted!");
                      dispatch(getAllPayments({ payload: { page, query } }));
                    },
                  })
                )
              }
              onCheckStatus={() =>
                dispatch(
                  checkPaymentStatus({
                    payload: { _id: p?._id },
                    onSuccess: ({ paymentStatus }) => {
                      toast[paymentStatus === "PAID" ? "success" : "error"](
                        paymentStatus === "PAID" ? "Paid!" : "Not Paid yet!"
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
  name,
  amount,
  phone,
  orderId,
  paymentLink,
  isPaid = false,
  onDelete,
  onCheckStatus,
}) => {
  return (
    <Tr
      className={`${
        isPaid ? "pt-[1.9rem]" : "pt-[1.15rem] !pb-[1.15rem]"
      } grid-cols-[17rem_8rem_17rem_31rem_minmax(25rem,1fr)_13rem_1.9rem]`}
    >
      <Td textLeftAlign>{name || "--"}</Td>
      <Td>{amount || "--"}</Td>
      <Td textLeftAlign>{phone || "--"}</Td>
      <Td textLeftAlign>{orderId || "--"}</Td>
      <Td className="opacity" textLeftAlign>
        <Link target="_blank" to={paymentLink || "--"}>
          {paymentLink || "--"}
        </Link>
      </Td>
      <Td className={`${isPaid ? "text-green-400 font-semibold" : ""}`}>
        {isPaid ? (
          "Paid"
        ) : (
          <button
            onClick={onCheckStatus}
            className="body-regular text-black px-[.6rem] py-[.7rem] bg-[#F1F1F1] opacity rounded-[.4rem]"
          >
            Check Status
          </button>
        )}
      </Td>
      <td>
        <TableMenu onDelete={onDelete} />
      </td>
    </Tr>
  );
};
