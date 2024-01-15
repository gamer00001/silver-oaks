import { Menu } from "@mui/material";

const MyMenu = ({ children, className = "", ...rest }) => {
  return (
    <Menu
      className={`[&_>_div_>_ul]:p-0 [&_>_div]:mt-[1rem] [&_>_div_>_ul]:grid ${className}`}
      {...rest}
    >
      {children}
    </Menu>
  );
};

export default MyMenu;
