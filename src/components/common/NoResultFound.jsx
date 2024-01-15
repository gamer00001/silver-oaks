import { SearchOff } from "@/assets/Icons";

const NoResultFound = () => {
  return (
    <div className="grid justify-items-center gap-[4.6rem]">
      <div className="text-[20rem] text-custom-black" role="img">
        <SearchOff />
      </div>
      <div className="grid justify-items-center gap-[1.6rem]">
        <h2 className="h5-bold text-custom-dark-gren">Sorry! no Data Found</h2>
        <p className="body-regular text-custom-dark-gren">Try something else</p>
      </div>
    </div>
  );
};

export default NoResultFound;
