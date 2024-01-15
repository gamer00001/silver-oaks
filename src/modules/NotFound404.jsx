import { NotFound404Image } from "@/assets/common";
import { Link } from "@/components/common";

const NotFound404 = () => {
  return (
    <div className="grid justify-center min-h-screen grid-rows-2 gap-[10rem]">
      <img
        className="max-h-full max-w-[95vw]"
        src={NotFound404Image}
        alt="404"
      />

      <div className="grid justify-items-center gap-[4rem] content-start">
        <h1 className="text-custom-dark-gren text-center font-semibold text-[1.7rem] uppercase tracking-[.2rem] leading-[200%]">
          Opps! Page Not Found
        </h1>

        <Link
          className="px-[4.2rem] py-[1.2rem] bg-custom-button-color rounded-full text-custom-dark-gren uppercase text-center text-[1.3rem] leading-[120%] opacity"
          to="/"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound404;
