const Tr = ({ className = "", children, ...rest }) => {
  return (
    <tr
      className={`pb-[1.9rem] grid min-w-fit w-full gap-[1.6rem] items-center ${className}`}
      {...rest}
    >
      {children}
    </tr>
  );
};

export default Tr;
