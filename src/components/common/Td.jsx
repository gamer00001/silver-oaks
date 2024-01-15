const Td = ({ className = "", children, textLeftAlign = false, ...rest }) => {
  return (
    <td
      className={`${
        textLeftAlign ? "text-left" : "text-center"
      } text-black text-[1.3283rem] leading-[120%] block overflow-hidden text-ellipsis whitespace-nowrap ${className}`}
      {...rest}
    >
      {children}
    </td>
  );
};

export default Td;
