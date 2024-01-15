import { Helmet } from "react-helmet";

const MyReactHelmet = ({ element, title }) => {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Silver Oaks` : "Silver Oaks"}</title>
      </Helmet>

      {element}
    </>
  );
};

export default MyReactHelmet;
