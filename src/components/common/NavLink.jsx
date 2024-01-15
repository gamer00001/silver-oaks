import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({
  onClick,
  to,
  className,
  children,
  stopDefaultClick = false,
  ...rest
}) => {
  const handleClick = (...rest) => {
    !stopDefaultClick && window.scrollTo({ top: 0, behavior: "smooth" });
    onClick && onClick(...rest);
  };
  return (
    <RouterNavLink
      onClick={handleClick}
      to={to}
      className={className}
      {...rest}
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
