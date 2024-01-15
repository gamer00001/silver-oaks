const convertQueryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};

  params.forEach((value, key) => {
    if (result[key] === undefined) {
      result[key] = value;
    } else {
      // If the parameter already exists, convert it to an array
      result[key] = Array.isArray(result[key])
        ? [...result[key], value]
        : [result[key], value];
    }
  });

  return result;
};

export default convertQueryStringToObject;
