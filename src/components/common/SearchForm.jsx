import { useGlobalContext, useQueryParams } from "@/hooks";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyInput, MyMenu } from ".";
import { convertObjectToQueryString, scrollToTop } from "@/utils";
import { SearchOutline } from "@/assets/Icons";

const SearchForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const initialValues = useQueryParams({
    query: "",
  });

  const { handleSubmit, handleChange, handleBlur, values } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (v) => {
      if (!v.query) delete v.query;
      navigate(`${pathname}?${convertObjectToQueryString({ ...v, page: 1 })}`);
      scrollToTop();
    },
  });

  return (
    <WithResponsiveSearchForm>
      <form
        className="grid gap-[.8rem] items-center justify-start"
        onSubmit={handleSubmit}
      >
        <MyInput
          type="search-input"
          placeholder="Search"
          className="max-w-[30rem]"
          onChange={(e, ...rest) => {
            handleChange(e, ...rest);
            if (!e.target.value) {
              handleSubmit();
            }
          }}
          onBlur={handleBlur}
          value={values.query}
          name="query"
        />
      </form>
    </WithResponsiveSearchForm>
  );
};

const WithResponsiveSearchForm = ({ children }) => {
  const { isNotLargeScreen } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);
  return isNotLargeScreen ? (
    children
  ) : (
    <>
      <button
        className="p-[1rem] rounded-full bg-custom-dark-gren text-custom-offwhite opacity text-[2rem] grid-center"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <SearchOutline />
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
      >
        <li>{children}</li>
      </MyMenu>
    </>
  );
};

export default SearchForm;
