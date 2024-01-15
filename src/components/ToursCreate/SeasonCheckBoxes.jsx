import { MyInput } from "../common";

const SeasonCheckBoxes = ({ value, onChange, error }) => {
  return (
    <label className="grid gap-[.5rem]">
      <span className="body-medium text-custom-dark-gren">Tour Type</span>

      <div className="grid gap-[.5rem]">
        <div className="grid gap-x-[2.9rem] gap-y-[1rem] grid-cols-[auto_auto_auto] sm:grid-cols-[auto_auto_auto_auto] justify-start">
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Summer"
            label="Summer"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Winter"
            label="Winter"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Spring"
            label="Spring"
          />
          <CustomCheckBox
            value={value}
            onChange={onChange}
            name="Autumn"
            label="Autumn"
          />
        </div>

        {error && (
          <p className="text-red-500 caption col-span-3 xs:col-span-4">
            {error}
          </p>
        )}
      </div>
    </label>
  );
};

export default SeasonCheckBoxes;

const CustomCheckBox = ({ value, onChange, name, ...rest }) => {
  return (
    <MyInput
      {...rest}
      type="checkbox"
      className="px-[2rem] py-[1.1rem] bg-[#F5F5F5] rounded-[.4rem]"
      onChange={() =>
        onChange(
          value && value.includes(name)
            ? value?.filter((v) => v !== name)
            : Array.from(new Set([...value, name]))
        )
      }
      checked={value && value.includes(name)}
    />
  );
};
