import { useCallback, useState } from "react";
import { Loader, ModalTop, MyInput } from "../common";
import { useFormik } from "formik";
import { paymentGatewaySchema } from "@/schema";
import { formatPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, getAllPayments } from "@/store";
import { useQueryParams } from "@/hooks";

const PaymentGatewayFormModal = ({ open, onClose }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const dispatch = useDispatch();
  const { createPaymentData } = useSelector((s) => s.paymentReducer);
  const { page, query } = useQueryParams({ page: 1, query: "" });

  const handleClosePaymentModal = useCallback(() => {
    setPaymentUrl(null);
    dispatch(getAllPayments({ payload: { page, query } }));
  }, [dispatch, page, query]);

  const onGetLink = useCallback(
    (body) => {
      dispatch(
        createPayment({
          payload: { body },
          onSuccess: ({ paymentURL }) => {
            toast.success("Payment link generated successfully!");
            onClose && onClose();
            setPaymentUrl(paymentURL);
          },
        })
      );
    },
    [dispatch, onClose]
  );

  return (
    <>
      <ModalTop
        className="!max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={open}
        onClose={!createPaymentData?.loading && onClose}
      >
        <div className="grid gap-[1.6rem]">
          <h2 className="h5-bold text-custom-dark-gren">Payment Gateway</h2>
          <p className="body-regular text-custom-dark-gren">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        <LinkGenerationForm onClose={onClose} onGetLink={onGetLink} />
      </ModalTop>

      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={Boolean(paymentUrl)}
        onClose={handleClosePaymentModal}
      >
        <div className="grid gap-[1.6rem]">
          <h2 className="h5-bold text-custom-dark-gren">Get Link</h2>
          <p className="body-regular text-custom-dark-gren">
            Offer some useful tips and advice for visitors to the Falcon Club
            Tourist page
          </p>
        </div>

        <LinkModalForm
          paymentLink={paymentUrl || "--"}
          onClose={handleClosePaymentModal}
        />
      </ModalTop>
    </>
  );
};

export default PaymentGatewayFormModal;

const LinkGenerationForm = ({ onClose, onGetLink }) => {
  const { createPaymentData } = useSelector((s) => s.paymentReducer);
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    dirty,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      customerName: "",
      phone: "",
      amount: "",
      selectedPriceIn: "PKR",
    },
    validationSchema: paymentGatewaySchema,
    onSubmit: (v) => {
      const copy = { ...v };
      copy.phone = formatPhoneNumber(v.phone).replace(/\s/g, "");
      onGetLink && onGetLink(copy);
    },
  });

  return (
    <form className="grid gap-[4.1rem]" onSubmit={handleSubmit}>
      <div className="grid gap-[2.4rem]">
        <MyInput
          label="Full Name"
          name="customerName"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.customerName && errors.customerName}
          value={values.customerName}
          placeholder="Enter customer full name"
          type="text"
        />
        <MyInput
          label="Phone Number"
          name="phone"
          onChange={(v) => setFieldValue("phone", v)}
          onBlur={handleBlur}
          error={touched.phone && errors.phone}
          value={values.phone}
          placeholder="Enter customer phone number"
          type="phone"
        />
        <MyInput
          label="Amount"
          name="amount"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.amount && errors.amount}
          value={values.amount}
          placeholder="Enter amount"
          type="number-only"
        />

        <Radio
          name="selectedPriceIn"
          onChange={(v) => setFieldValue("selectedPriceIn", v)}
          onBlur={handleBlur}
          value={values.selectedPriceIn}
        />
      </div>

      <div className="grid justify-start content-start gap-[2.9rem] grid-cols-2 max-w-[52rem]">
        <button
          className="overflow-hidden relative p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-transparent text-custom-dark-gren bg-custom-button-color opacity-button disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!dirty || createPaymentData?.loading}
          type="submit"
        >
          {createPaymentData?.loading && <Loader type="button" />}
          Get Link
        </button>
        <button
          className="p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-custom-button-color text-custom-dark-gren bg-transparent opacity-button disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={onClose}
          disabled={createPaymentData?.loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const Radio = ({ value, onChange, ...rest }) => {
  return (
    <label className="grid gap-[.5rem]">
      <span className="body-medium text-custom-dark-gren">Price In</span>

      <div className="grid gap-x-[2.9rem] gap-y-[1rem] grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] justify-start">
        <CustomRadio
          {...rest}
          value={value}
          onChange={onChange}
          name="PKR"
          label="PKR"
        />
        <CustomRadio
          {...rest}
          value={value}
          onChange={onChange}
          name="USD"
          label="USD"
        />
      </div>
    </label>
  );
};

const CustomRadio = ({ value, onChange, name, ...rest }) => {
  return (
    <MyInput
      {...rest}
      type="radio"
      className="px-[2rem] py-[1.1rem] bg-[#F5F5F5] rounded-[.4rem]"
      onClick={() => onChange(name)}
      checked={name === value}
    />
  );
};

const LinkModalForm = ({ paymentLink, onClose }) => {
  return (
    <div className="grid gap-[4.2rem]">
      <div className="grid grid-cols-[1fr_auto] items-center gap-[1.25rem] p-[.75rem_.75rem_.75rem_2.2rem] border border-[#E0E0E0] rounded-full">
        <p className="text-[1.9rem] text-[#9E9E9E] whitespace-nowrap overflow-hidden text-ellipsis">
          {paymentLink}
        </p>

        <CopyToClipboard text={paymentLink}>
          <button
            onClick={() => toast.success("Copied!")}
            className="bg-custom-dark-gren text-white px-[3.1rem] py-[1.3rem] rounded-full text-[2.2rem] opacity"
          >
            Copy
          </button>
        </CopyToClipboard>
      </div>

      <div className="">
        <button
          className="p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-custom-button-color text-custom-dark-gren bg-transparent opacity-button disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
