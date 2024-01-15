import { useFormik } from "formik";
import { Loader, ModalTop, MyInput } from "../common";
import { tailorMadeBookingFormSchema } from "@/schema";
import { CONSTANTS } from "@/constants";
import { getAllTailorBookings, updateTailorBooking } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useQueryParams } from "@/hooks";

const TailorBookingFormModal = ({ open, onClose, initialValues, disabled }) => {
  const { updateTailorBookingData } = useSelector(
    (s) => s.tailorApplicationReducer
  );
  return (
    <ModalTop
      className="!max-w-[78rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
      open={open}
      onClose={!updateTailorBookingData?.loading && onClose}
    >
      <h2 className="h5-bold text-custom-dark-gren">
        Tailor Made Tour Booking Form
      </h2>

      <TailorMadeTourForm
        onClose={onClose}
        initialValues={initialValues}
        disabled={disabled}
      />
    </ModalTop>
  );
};

export default TailorBookingFormModal;

const TailorMadeTourForm = ({ onClose, initialValues, disabled }) => {
  const dispatch = useDispatch();
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { updateTailorBookingData } = useSelector(
    (s) => s.tailorApplicationReducer
  );

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
      firstName: "",
      lastName: "",
      preferBy: "phone",
      email: "",
      phone: "",
      travelPackage: "Standard",
      numberOfAdultPerson: 5,
      numberOfRoom: 1,
      departureDate: "",
      days: 30,
      requirement: "",
      wantCustomize: false,

      tour: "",

      orderId: "",
      status: "Active",
      paidBy: "None",
      paymentStatus: "UNPAID",

      ...initialValues,
    },
    validationSchema: tailorMadeBookingFormSchema(1),
    onSubmit(body) {
      dispatch(
        updateTailorBooking({
          payload: { _id: initialValues?._id, body },
          onSuccess: () => {
            onClose && onClose();
            toast.success("Update successfully!");
            dispatch(getAllTailorBookings({ payload: { page, query } }));
          },
        })
      );
    },
  });

  return (
    <form onSubmit={handleSubmit} className="grid gap-[3.2rem]">
      <div className="grid grid-cols-12 gap-x-[2rem] gap-y-[2.4rem] items-start">
        <MyInput
          label="Tour URL"
          className="col-span-12"
          value={`${CONSTANTS.VITE_USER_SITE_BASE_URL}/tour-details/tailor-made-tour/${values.tour}`}
          disabled
        />

        <MyInput
          label="Tour ID"
          className="col-span-12"
          value={values.tour}
          error={touched.tour && errors.tour}
          name="tour"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />

        <MyInput
          label="First Name"
          placeholder="Enter First Name"
          className="col-span-12 xs:col-span-6"
          value={values.firstName}
          error={touched.firstName && errors.firstName}
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />

        <MyInput
          label="Last Name"
          placeholder="Enter Last Name"
          className="col-span-12 xs:col-span-6"
          value={values.lastName}
          error={touched.lastName && errors.lastName}
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />

        <div className="col-span-12 grid gap-[2.1rem]">
          <label className="overline-custom text-[#2CC1FC]">
            I prefer to be contacted by *
          </label>
          <div className="flex items-center gap-[3.2rem] justify-start flex-wrap">
            <MyInput
              type="radio"
              label="Phone"
              value="phone"
              onChange={handleChange}
              name="preferBy"
              checked={values.preferBy === "phone"}
              disabled={disabled}
            />
            <MyInput
              type="radio"
              label="Email"
              value="email"
              onChange={handleChange}
              name="preferBy"
              checked={values.preferBy === "email"}
              disabled={disabled}
            />
          </div>
        </div>

        <MyInput
          label="Email Address"
          placeholder="Enter Your Email"
          className="col-span-12 xs:col-span-6"
          value={values.email}
          error={touched.email && errors.email}
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />

        <MyInput
          label="Contact Number"
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

        <div className="col-span-12 grid gap-[2.1rem]">
          <label className="caption text-custom-dark-gren">
            Travel Pakages
          </label>
          <div className="flex items-center gap-[3.2rem] justify-start flex-wrap">
            <MyInput
              type="radio"
              label="Standard"
              name="travelPackage"
              value="Standard"
              onChange={handleChange}
              checked={values.travelPackage === "Standard"}
              disabled={disabled}
            />
            <MyInput
              type="radio"
              label="Deluxe"
              name="travelPackage"
              value="Deluxe"
              onChange={handleChange}
              checked={values.travelPackage === "Deluxe"}
              disabled={disabled}
            />
            <MyInput
              type="radio"
              label="Executive"
              name="travelPackage"
              value="Executive"
              onChange={handleChange}
              checked={values.travelPackage === "Executive"}
              disabled={disabled}
            />
          </div>
        </div>

        <HeadingRow title="Number of Travelers">
          <MyInput
            label="Adult Person"
            placeholder="Enter Number of Adult Persons"
            className="col-span-12 xs:col-span-6"
            value={values.numberOfAdultPerson}
            error={touched.numberOfAdultPerson && errors.numberOfAdultPerson}
            name="numberOfAdultPerson"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
          />
          <MyInput
            label="Room"
            placeholder="Enter Number of Rooms"
            className="col-span-12 xs:col-span-6"
            value={values.numberOfRoom}
            error={touched.numberOfRoom && errors.numberOfRoom}
            name="numberOfRoom"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!values.wantCustomize || disabled}
          />
        </HeadingRow>

        <HeadingRow title="When would you like to go?">
          <MyInput
            label="Departure Date"
            placeholder="Enter Departure Date"
            className="col-span-12 "
            type="date"
            value={
              values.departureDate
                ? new Date(values.departureDate).toISOString().slice(0, 10)
                : ""
            }
            error={touched.departureDate && errors.departureDate}
            name="departureDate"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
          />
        </HeadingRow>

        <HeadingRow title="Tour Duration">
          <MyInput
            label="Days"
            placeholder="Enter Number of Days"
            className="col-span-12"
            value={values.days}
            error={touched.days && errors.days}
            name="days"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!values.wantCustomize || disabled}
          />

          <MyInput
            className="col-span-12"
            type="switch"
            label="Want extra customization?"
            checked={values.wantCustomize}
            error={touched.wantCustomize && errors.wantCustomize}
            name="wantCustomize"
            onClick={(e) => setFieldValue("wantCustomize", !e.target.checked)}
            disabled={disabled}
          />
        </HeadingRow>

        {values.wantCustomize && (
          <MyInput
            type="textarea"
            label="Requirement/Preferences"
            placeholder="Enter Your Requirements and Preferences"
            className="col-span-12"
            value={values.requirement}
            error={touched.requirement && errors.requirement}
            name="requirement"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
          />
        )}

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

        <MyInput
          type="select"
          label="Application Status"
          className="col-span-12 xs:col-span-6"
          value={values.status}
          error={touched.status && errors.status}
          name="status"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        >
          <option value="">Select Application Status</option>
          <option value="Active">Active</option>
          <option value="Retained">Retained</option>
          <option value="Closed">Closed</option>
        </MyInput>
      </div>

      <div className="grid gap-[1.6rem] grid-cols-[auto_auto] justify-center">
        {!disabled && (
          <>
            <button
              className="relative overflow-hidden px-[5.8rem] py-[1.2rem] border border-custom-button-color bg-custom-button-color rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!dirty || updateTailorBookingData?.loading}
            >
              {updateTailorBookingData?.loading && <Loader type="button" />}
              Update
            </button>
            <button
              className="px-[5.8rem] py-[1.2rem] border border-custom-dark-gren/30 rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              disabled={updateTailorBookingData?.loading}
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

const HeadingRow = ({ title, children }) => {
  return (
    <div className="col-span-12 grid grid-cols-12 gap-x-[2rem] gap-y-[1.6rem] items-start">
      <label className="col-span-12 body-medium text-black">{title}</label>
      {children}
    </div>
  );
};
