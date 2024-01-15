import { useFormik } from "formik";
import { ModalTop } from "../common";
import { contactUsFormSchema } from "@/schema";

const ContactUsFormModal = ({ open, onClose, initialValues }) => {
  return (
    <ModalTop
      className="!max-w-[69.6rem] p-[2.4rem] grid gap-[1.6rem] bg-[#d9e5ef]"
      open={open}
      onClose={onClose}
    >
      <h2 className="h5-bold text-custom-dark-gren">Contact Us Form</h2>

      <ContactUsForm onClose={onClose} initialValues={initialValues} />
    </ModalTop>
  );
};

export default ContactUsFormModal;

const ContactUsForm = ({ onClose, initialValues }) => {
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactUsFormSchema,
      onSubmit() {},
    });

  return (
    <form onSubmit={handleSubmit} className="grid gap-[2.4rem]">
      <ContactUsInput
        type="text"
        label="Your Full Name"
        value={values.fullName}
        name="fullName"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.fullName && errors.fullName}
        disabled
      />
      <ContactUsInput
        type="email"
        label="Email Address"
        value={values.email}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        disabled
      />
      <ContactUsInput
        type="text"
        label="Contact Number"
        value={values.phone}
        name="phone"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone && errors.phone}
        disabled
      />
      <ContactUsInput
        type="textarea"
        label="Message"
        value={values.message}
        name="message"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.message && errors.message}
        disabled
      />
      <div className="grid gap-[1.6rem] grid-cols-[auto_auto] justify-center">
        <button
          className="px-[5.8rem] py-[1.2rem] border border-custom-button-color bg-custom-button-color rounded-[.4rem] text-custom-black text-[1.6rem] font-bold leading-[120%] enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
};

const ContactUsInput = ({ id, type, label, error, ...rest }) => {
  return (
    <div className="grid gap-[2.4rem]">
      <label className="caption text-custom-dark-gren" htmlFor={id}>
        {label}
      </label>
      <div className="grid gap-[1.6rem]">
        {type === "textarea" ? (
          <textarea
            className="text-custom-dark-gren caption outline-none py-[1.9rem] px-[1.6rem] border border-custom-accent bg-custom-offwhite rounded-[.4em] w-full max-w-[64.6rem] resize-none h-[19.9rem] disabled:cursor-not-allowed"
            {...rest}
          />
        ) : (
          <input
            className="text-custom-dark-gren caption outline-none py-[1.9rem] px-[1.6rem] border border-custom-accent bg-custom-offwhite rounded-[.4em] w-full max-w-[64.6rem] disabled:cursor-not-allowed"
            type={type}
            {...rest}
          />
        )}
        {error && <p className="text-red-500 caption">{error}</p>}
      </div>
    </div>
  );
};
