import { Modal } from "@mui/material";
import { useMemo } from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ type, ...rest }) => {
  const Component = useMemo(() => {
    switch (type) {
      case "button":
        return ButtonLoader;
      case "screen":
        return ScreenBGLoader;
      case "screen-bg":
        return ScreenBGLoader;
      default:
        return OvalLoader;
    }
  }, [type]);
  return <Component {...rest} />;
};

export default Loader;

const OvalLoader = ({ className = "" }) => {
  return (
    <div
      className={`grid items-center justify-items-center min-h-[calc(100vh_-_11.2rem)] ${className}`}
    >
      <Oval
        height="15rem"
        width="15rem"
        color="#F4D06F"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f4d16fc1"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

const ButtonLoader = ({
  className = "",
  color = "#121212",
  secondaryColor = "#395556",
}) => {
  return (
    <div
      className={`absolute inset-0 z-[1] bg-custom-button-color grid items-center justify-items-center ${className}`}
    >
      <Oval
        height="3rem"
        width="3rem"
        color={color}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={secondaryColor}
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};

// const ScreenLoader = ({ className = "" }) => {
//   return (
//     <Modal
//       open
//       onClose={() => {}}
//       className={`grid items-center justify-items-center min-h-[calc(100vh_-_11.2rem)] [&_>_.MuiBackdrop-root]:bg-[#F4D06F]/30 ${className}`}
//     >
//       <Oval
//         height="15rem"
//         width="15rem"
//         color="#F4D06F"
//         wrapperStyle={{}}
//         wrapperClass=""
//         visible={true}
//         ariaLabel="oval-loading"
//         secondaryColor="#f4d16fc1"
//         strokeWidth={4}
//         strokeWidthSecondary={4}
//       />
//     </Modal>
//   );
// };

const ScreenBGLoader = ({ className = "" }) => {
  return (
    <Modal
      open
      onClose={() => {}}
      className={`grid items-center justify-items-center min-h-[calc(100vh_-_11.2rem)] [&_>_.MuiBackdrop-root]:bg-black/30 [&_>_.MuiBackdrop-root]:backdrop-blur-sm ${className}`}
    >
      <Oval
        height="15rem"
        width="15rem"
        color="#F4D06F"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f4d16fc1"
        strokeWidth={1}
        strokeWidthSecondary={1.3}
      />
    </Modal>
  );
};
