const formatDate = (date = new Date()) => {
  const dateObject = new Date(date);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(dateObject);
};

export default formatDate;
