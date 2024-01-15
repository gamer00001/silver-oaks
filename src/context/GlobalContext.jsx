import { useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";

export const GlobalContext = createContext({
  isNotExtraExtraSmallScreen: false,
  isNotExtraSmallScreen: false,
  isNotSmallScreen: false,
  isNotMediumScreen: false,
  isNotLargeScreen: false,
  isNotExtraLargeScreen: false,
  isNotExtraExtraLargeScreen: false,
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  isRightSidebarOpen: false,
  setIsRightSidebarOpen: () => {},
});

const GlobalContextProvider = ({ children }) => {
  const isNotExtraExtraSmallScreen = useMediaQuery("(min-width: 400px)");
  const isNotExtraSmallScreen = useMediaQuery("(min-width: 500px)");
  const isNotSmallScreen = useMediaQuery("(min-width: 640px)");
  const isNotMediumScreen = useMediaQuery("(min-width: 768px)");
  const isNotLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isNotExtraLargeScreen = useMediaQuery("(min-width: 1280px)");
  const isNotExtraExtraLargeScreen = useMediaQuery("(min-width: 1536px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isNotExtraExtraSmallScreen,
        isNotExtraSmallScreen,
        isNotSmallScreen,
        isNotMediumScreen,
        isNotLargeScreen,
        isNotExtraLargeScreen,
        isNotExtraExtraLargeScreen,
        isSidebarOpen,
        setIsSidebarOpen,
        isRightSidebarOpen,
        setIsRightSidebarOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
