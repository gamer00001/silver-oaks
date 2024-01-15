import { Eye, PencilOutline, ThreeDotsMenu, Trash } from "@/assets/Icons";
import { DeleteModal, MyMenu } from ".";
import { useState } from "react";
import { HiDuplicate } from "react-icons/hi";

const TableMenu = ({ onView, onEdit, onDelete, onDuplicate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      <button
        className="text-[1.8rem] text-[#1A1B25] grid items-center grid-cols-[auto] justify-items-end"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <ThreeDotsMenu />
      </button>

      <MyMenu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="[&_>_div_>_ul]:bg-[#F0F5FB] [&_>_div_>_ul]:p-[1.2rem] [&_>_div_>_ul]:gap-[1rem]"
      >
        {onView && (
          <TableMenuItem
            icon={<Eye />}
            text="View"
            onClick={() => {
              onView && onView();
              setAnchorEl(null);
            }}
          />
        )}
        {onEdit && (
          <TableMenuItem
            icon={<PencilOutline />}
            text="Edit"
            onClick={() => {
              onEdit && onEdit();
              setAnchorEl(null);
            }}
          />
        )}
        {onDuplicate && (
          <TableMenuItem
            icon={<HiDuplicate />}
            text="Duplicate"
            onClick={() => {
              onDuplicate && onDuplicate();
              setAnchorEl(null);
            }}
          />
        )}
        {onDelete && (
          <TableMenuItem
            icon={<Trash />}
            text="Delete"
            onClick={() => {
              setIsDeleteModalOpen(true);
              setAnchorEl(null);
            }}
            isRed
          />
        )}
        
      </MyMenu>

      <DeleteModal
        onClose={() => setIsDeleteModalOpen(false)}
        onOkay={() => {
          setIsDeleteModalOpen(null);
          onDelete && onDelete();
        }}
        open={isDeleteModalOpen}
      />
    </>
  );
};

export default TableMenu;

const TableMenuItem = ({
  className = "",
  icon,
  text,
  isRed = false,
  ...rest
}) => {
  return (
    <li
      className={`grid grid-cols-[1fr_auto] gap-[1.2rem] items-center cursor-pointer opacity ${className}`}
      {...rest}
    >
      <span
        className={`text-[1.3rem] leading-[120%] font-medium ${
          isRed ? "text-[#FF6F61]" : "text-custom-dark-gren"
        }`}
      >
        {text}
      </span>
      <span
        className={`text-[2rem] grid content-center justify-items-center ${
          isRed ? "text-[#FF6F61]" : "text-custom-dark-gren"
        }`}
      >
        {icon}
      </span>
    </li>
  );
};
