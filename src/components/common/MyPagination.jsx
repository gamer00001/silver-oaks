import { ChevronLeftOutline } from "@/assets/Icons";
import { useQueryParams } from "@/hooks";
import { convertObjectToQueryString } from "@/utils";
import usePagination from "@mui/material/usePagination";
import { useLocation, useNavigate } from "react-router-dom";

const MyPagination = ({ page, totalPages }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryParams = useQueryParams({ page: 0 });

  // Adjust the usePagination to start from 0
  const { items } = usePagination({
    count: totalPages,
    page: Number(page) + 1, // Increment page by 1 to align with MUI's 1-based index
    onChange: (_, newPage) => {
      navigate(
        `${pathname}?${convertObjectToQueryString({
          ...queryParams,
          page: newPage - 1,
        })}` // Decrement by 1 to use 0-based index
      );
    },
  });

  return (
    <nav>
      <ul className="flex justify-start gap-[.8rem] items-center">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = <PaginationButton>...</PaginationButton>;
          } else if (type === "page") {
            children = (
              <PaginationButton {...item} selected={selected}>
                {page - 1} {/* Display 0-based page number */}
              </PaginationButton>
            );
          } else if (type === "previous") {
            children = (
              <PaginationButton {...item} selected={selected}>
                <span className="block rotate-180">
                  <ChevronLeftOutline />
                </span>
              </PaginationButton>
            );
          } else {
            children = (
              <PaginationButton {...item} selected={selected}>
                <span>
                  <ChevronLeftOutline />
                </span>
              </PaginationButton>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
};

const PaginationButton = ({ children, selected, className = "", ...rest }) => {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex justify-center items-center w-[3.2rem] h-[3.2rem] text-custom-dark-grey-400 font-Inter leading-[142%] font-bold text-[1.4rem] border ${
        selected ? "bg-custom-golden" : "border-[#DFE3E8]"
      } rounded-[.4rem] disabled:bg-[#DFE3E8] disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default MyPagination;
