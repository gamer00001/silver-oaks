import toast from "react-hot-toast";
import { FcInfo } from "react-icons/fc";
import { IoIosWarning } from "react-icons/io";

toast.info = (message = "", options = {}, ...rest) => {
  toast(
    message,
    {
      icon: <FcInfo className="text-blue-500 text-[2rem]" />,
      ...options,
    },
    ...rest
  );
};

toast.warning = (message = "", options = {}, ...rest) => {
  toast(
    message,
    {
      icon: <IoIosWarning className="text-yellow-500 text-[2rem]" />,
      ...options,
    },
    ...rest
  );
};

export default toast;
