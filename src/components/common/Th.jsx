const Th = ({ className = "", children, textLeftAlign = false, ...rest }) => {
  return (
    <th
      className={`${
        textLeftAlign ? "text-left" : "text-center"
      } text-black text-[1.4305rem] font-semibold leading-[120%] block overflow-hidden text-ellipsis whitespace-nowrap ${className} `}
      {...rest}
    >
      {children}
    </th>
  );
};

export default Th;
