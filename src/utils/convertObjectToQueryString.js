const convertObjectToQueryString = (params) => {
  const queryString = Object.keys(params)
    .map((key) => {
      if (params === null) {
        return "";
      } else if (Array.isArray(params[key])) {
        return params[key]
          .map((value) => `${key}=${encodeURIComponent(value)}`)
          .join("&");
      } else {
        return `${key}=${encodeURIComponent(params[key])}`;
      }
    })
    .join("&");

  return queryString;
};

export default convertObjectToQueryString;
