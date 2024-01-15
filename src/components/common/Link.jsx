import { Link as RouterLink } from "react-router-dom";

const Link = ({
  onClick,
  to,
  className = "",
  children,
  stopDefaultClick = false,
  ...rest
}) => {
  const handleClick = (...rest) => {
    !stopDefaultClick && window.scrollTo({ top: 0, behavior: "smooth" });
    onClick && onClick(...rest);
  };
  return (
    <RouterLink onClick={handleClick} to={to} className={className} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
