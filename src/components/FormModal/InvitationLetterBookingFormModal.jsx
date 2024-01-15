import { useFormik } from "formik";
import { Loader, ModalTop, MyInput } from "../common";
import { invitationLetterBookingFormSchema } from "@/schema";
import { useDispatch, useSelector } from "react-redux";
import { useQueryParams } from "@/hooks";
import {
  getAllInvitationLetter,
  imageUpload,
  updateInvitationLetter,
} from "@/store";
import toast from "react-hot-toast";
import { CONSTANTS } from "@/constants";

const InvitationLetterBookingFormModal = ({
  open,
  onClose,
  initialValues,
  disabled,
}) => {
  const { updateInvitationLetterData } = useSelector(
    (s) => s.invitationLetterApplicationReducer
  );
  const { imageUploadData } = useSelector((s) => s.uploadReducer);

  return (
    <ModalTop
      className="!max-w-[78rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
      open={open}
      onClose={
        !updateInvitationLetterData?.loading &&
        !imageUploadData?.loading &&
        onClose
      }
    >
      <h2 className="h5-bold text-custom-dark-gren">Invitation Letter Form</h2>

      <InvitationLetterForm
        onClose={onClose}
        initialValues={initialValues}
        disabled={disabled}
      />
    </ModalTop>
  );
};

export default InvitationLetterBookingFormModal;

const InvitationLetterForm = ({ onClose, initialValues, disabled }) => {
  const dispatch = useDispatch();
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { updateInvitationLetterData } = useSelector(
    (s) => s.invitationLetterApplicationReducer
  );
  const { imageUploadData } = useSelector((s) => s.uploadReducer);

  const {
    handleSubmit,
    setFieldValue,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      recapthaValue: "",
      package: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      visaType: "",
      portOfEntry: "",
      dateOfArrival: "",
      dateOfDeparture: "",
      placeToVisit: "",
      emergencyNumbers: "",
      addOnServices: [],
      passwordImage: null,

      orderId: "",
      paidBy: "None",
      paymentStatus: "UNPAID",

      ...initialValues,
    },
    validationSchema: invitationLetterBookingFormSchema,
    onSubmit(body) {
      const f1 = () =>
        dispatch(
          updateInvitationLetter({
            payload: { _id: initialValues?._id, body },
            onSuccess: () => {
              onClose && onClose();
              toast.success("Update successfully!");
              dispatch(getAllInvitationLetter({ payload: { page, query } }));
            },
          })
        );

      if (typeof body.passwordImage === "string") f1();
      else
        dispatch(
          imageUpload({
            payload: { images: [body.passwordImage] },
            onSuccess: (data) => {
              body.passwordImage = data.files[0];
              f1();
            },
          })
        );
    },
  });

  return (
    <form onSubmit={handleSubmit} className="grid gap-[3.2rem]">
      <Row>
        <Row isFullRow>
          <MyInput
            label="Select Package: *"
            className="col-span-12 sm:col-span-6"
            type="select"
            onChange={handleChange}
            value={values.package}
            error={touched.package && errors.package}
            name="package"
            onBlur={handleBlur}
            disabled={disabled}
          >
            <option value="" disabled>
              Select Package
            </option>
            <option value="package1">Package 1</option>
            <option value="package2">Package 2</option>
            <option value="package3">Package 3</option>
          </MyInput>
        </Row>

        <MyInput
          label="First name (in English) *"
          placeholder="Enter your first name"
          className="col-span-12 sm:col-span-6"
          type="text"
          value={values.firstName}
          onChange={handleChange}
          error={touched.firstName && errors.firstName}
          name="firstName"
          onBlur={handleBlur}
          disabled={disabled}
        />

        <MyInput
          label="Last Name (In English) *"
          placeholder="Enter your last name"
          className="col-span-12 sm:col-span-6"
          type="text"
          value={values.lastName}
          onChange={handleChange}
          error={touched.lastName && errors.lastName}
          onBlur={handleBlur}
          name="lastName"
          disabled={disabled}
        />

        <MyInput
          label="Contact Number: *"
          placeholder="Enter Phone Number"
          className="col-span-12 xs:col-span-6"
          value={values.phone}
          error={touched.phone && errors.phone}
          name="phone"
          onChange={(v) => setFieldValue("phone", v)}
          onBlur={handleBlur}
          type="phone"
          disabled={disabled}
        />

        <MyInput
          type="email"
          className="col-span-12 sm:col-span-6"
          label="Email: *"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && errors.email}
          onBlur={handleBlur}
          name="email"
          disabled={disabled}
        />

        <Row isFullRow>
          <MyInput
            label="Type of Visa: *"
            className="col-span-12 sm:col-span-6"
            type="select"
            value={values.visaType}
            onChange={handleChange}
            error={touched.visaType && errors.visaType}
            onBlur={handleBlur}
            name="visaType"
            disabled={disabled}
          >
            <option value="" disabled>
              Type of Visa
            </option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Business Visa">Business Visa</option>
            <option value="To meet Friends/Family">
              To meet Friends/Family
            </option>
          </MyInput>

          <MyInput
            label="Port of Entry: *"
            className="col-span-12 sm:col-span-6"
            type="select"
            value={values.portOfEntry}
            onChange={handleChange}
            error={touched.portOfEntry && errors.portOfEntry}
            onBlur={handleBlur}
            name="portOfEntry"
            disabled={disabled}
          >
            <option value="" disabled>
              Port of Entry
            </option>
            <option value="Islamabad">Islamabad</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
          </MyInput>
        </Row>

        <MyInput
          type="date"
          className="col-span-12 sm:col-span-6"
          label="Date of Arrival: *"
          placeholder="Enter your arrival date"
          value={
            values.dateOfArrival
              ? new Date(values.dateOfArrival).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          error={touched.dateOfArrival && errors.dateOfArrival}
          onBlur={handleBlur}
          name="dateOfArrival"
          disabled={disabled}
        />

        <MyInput
          type="date"
          className="col-span-12 sm:col-span-6"
          label="Date of Departure: *"
          placeholder="Enter your departure date"
          value={
            values.dateOfDeparture
              ? new Date(values.dateOfDeparture).toISOString().slice(0, 10)
              : ""
          }
          onChange={handleChange}
          error={touched.dateOfDeparture && errors.dateOfDeparture}
          onBlur={handleBlur}
          name="dateOfDeparture"
          disabled={disabled}
        />

        <MyInput
          type="textarea"
          className="col-span-12"
          label="Intended places to visit: *"
          placeholder="Brief Comment"
          value={values.placeToVisit}
          onChange={handleChange}
          error={touched.placeToVisit && errors.placeToVisit}
          onBlur={handleBlur}
          name="placeToVisit"
          disabled={disabled}
        />

        <MyInput
          type="textarea"
          className="col-span-12"
          label="Emergency Contact number of host/friend in Pakistan or home country: *"
          placeholder="Brief Comment"
          value={values.emergencyNumbers}
          onChange={handleChange}
          error={touched.emergencyNumbers && errors.emergencyNumbers}
          onBlur={handleBlur}
          name="emergencyNumbers"
          disabled={disabled}
        />

        <MyInput
          options={[
            "Car Rental",
            "Hotel bookings",
            "Bike rental",
            "Tour package",
          ]}
          type="checkbox-group"
          value={values.addOnServices}
          onChange={handleChange}
          error={touched.addOnServices && errors.addOnServices}
          name="addOnServices"
          className="col-span-12"
          label="Add on services"
          disabled={disabled}
        />

        <p className="col-span-12 font-semibold text-[1.3rem] text-custom-dark-gren">
          You may contact our sales team as well at{" "}
          <a
            className="text-custom-button-color hover:underline"
            href="mailto:info@falconclub.pk"
            target="_blank"
            rel="noreferrer"
          >
            info@falconclub.pk
          </a>
        </p>

        <MyInput
          type="file"
          label="Password Photo"
          accept=".png, .jpeg, .jpg"
          className="col-span-12"
          value={
            typeof values.passwordImage === "string"
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.passwordImage}`
              : values.passwordImage
          }
          onChange={(v) => setFieldValue("passwordImage", v)}
          onBlur={handleBlur}
          error={touched.passwordImage && errors.passwordImage}
          name="passwordImage"
          disabled={disabled}
        />

        <MyInput
          type="select"
          label="Payment Status"
          className="col-span-12 xs:col-span-6"
          value={values.paymentStatus}
          error={touched.paymentStatus && errors.paymentStatus}
          name="paymentStatus"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        >
          <option value="">Select Payment Status</option>
          <option value="PAID">PAID</option>
          <option value="UNPAID">UNPAID</option>
        </MyInput>

        <MyInput
          type="select"
          label="Paid By"
          className="col-span-12 xs:col-span-6"
          value={values.paidBy}
          error={touched.paidBy && errors.paidBy}
          name="paidBy"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        >
          <option value="">Select Payment Method</option>
          <option value="Alfalah">Alfalah</option>
          <option value="PayPro">Pay Pro</option>
          <option value="None">None</option>
        </MyInput>

        <MyInput
          type="text"
          label="Order Id"
          placeholder="Enter unique order id"
          className="col-span-12 xs:col-span-6"
          value={values.orderId}
          error={touched.orderId && errors.orderId}
          name="orderId"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </Row>

      <div className="grid gap-[1.6rem] grid-cols-[auto_auto] justify-center">
        {!disabled && (
          <>
            <button
              className="relative overflow-hidden px-[5.8rem] py-[1.2rem] border border-custom-button-color bg-custom-button-color rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={
                !dirty ||
                updateInvitationLetterData?.loading ||
                imageUploadData?.loading
              }
            >
              {(updateInvitationLetterData?.loading ||
                imageUploadData?.loading) && <Loader type="button" />}
              Update
            </button>
            <button
              className="px-[5.8rem] py-[1.2rem] border border-custom-dark-gren/30 rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={
                updateInvitationLetterData?.loading || imageUploadData?.loading
              }
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}

        {disabled && (
          <button
            className="px-[5.8rem] py-[1.2rem] border border-custom-button-color bg-custom-button-color rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </form>
  );
};

const Row = ({
  Element = "div",
  className = "",
  isFullRow = false,
  children,
  ...rest
}) => {
  return (
    <Element
      className={`${
        isFullRow ? "col-span-12" : ""
      } grid grid-cols-12 gap-x-[2rem] gap-y-[2.4rem] items-start ${className}`}
      {...rest}
    >
      {children}
    </Element>
  );
};
