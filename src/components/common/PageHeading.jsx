import { Plus } from "@/assets/Icons";
import { Link } from "@/components/common";

const PageHeading = ({ to = "", detail = "", heading = "", onClick }) => {
  return (
    <div className="px-[1.7rem]">
      <div className="bg-white px-[2rem] xxs:px-[2.4rem] xs:px-[2.8rem] sm:px-[3.3rem] md:px-[3.7rem] lg:px-[4.2rem] pt-[3rem] pb-[4.6rem] rounded-[.8rem] grid items-center grid-cols-[1fr_auto] gap-[3rem]">
        <div className="grid gap-[1.6rem]">
          <h1 className="h5-bold text-custom-dark-gren">{heading}</h1>
          <p className="body-regular text-custom-dark-gren">{detail}</p>
        </div>
        <div className="grid-center">
          {to && (
            <Link
              className="text-white text-[3rem] grid-center w-[5rem] h-[5rem] rounded-full bg-custom-dark-gren opacity"
              to={to}
            >
              <Plus />
            </Link>
          )}
          {onClick && (
            <button
              className="text-white text-[3rem] grid-center w-[5rem] h-[5rem] rounded-full bg-custom-dark-gren opacity"
              onClick={onClick}
            >
              <Plus />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PageHeading;
