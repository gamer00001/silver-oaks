import { convertQueryStringToObject } from "@/utils";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = (obj = {}) => {
  const { search } = useLocation();
  const queryParams = useMemo(() => {
    const queryParams = convertQueryStringToObject(search);
    for (const key in obj) {
      if (queryParams[key] === undefined) {
        queryParams[key] = obj[key];
      }
    }

    return queryParams;
  }, [obj, search]);
  return queryParams;
};

export default useQueryParams;
