import { MyInput } from "../common";

const TourTypeRadio = ({ value, onChange, disabled = false }) => {
  return (
    <label className="grid gap-[.5rem]">
      <span className="body-medium text-custom-dark-gren">Tour Type</span>

      <div className="grid gap-x-[2.9rem] gap-y-[1rem] grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto] justify-start">
        <CustomRadio
          value={value}
          onChange={onChange}
          name="couple"
          label="Couple Tour"
          disabled={disabled}
        />
        <CustomRadio
          value={value}
          onChange={onChange}
          name="group"
          label="Group Tour"
          disabled={disabled}
        />
        <CustomRadio
          value={value}
          onChange={onChange}
          name="tailor"
          label="Tailor-Made Tour"
          disabled={disabled}
        />
      </div>
    </label>
  );
};

export default TourTypeRadio;

const CustomRadio = ({ value, onChange, name, disabled = false, ...rest }) => {
  return (
    <MyInput
      {...rest}
      type="radio"
      className="px-[2rem] py-[1.1rem] bg-[#F5F5F5] rounded-[.4rem]"
      onClick={() => onChange(name)}
      checked={name === value}
      disabled={disabled}
    />
  );
};
