import { useLayoutEffect, useState } from "react";

const Image = ({
  src,
  alt,
  onError,
  containerClassName = "",
  className = "",
  errorMessage = "There's no photo to show!",
  title = "",
  errorClassName = "",
  ...rest
}) => {
  const [isError, setIsError] = useState(false);
  const handleError = (...rest) => {
    setIsError(true);
    onError && onError(...rest);
  };

  useLayoutEffect(() => {
    setIsError(false);
  }, [src]);

  return (
    <div
      className={`w-full h-full inline-block relative ${containerClassName}`}
      title={title}
    >
      <img
        className={`${className} ${isError ? errorClassName : ""}`}
        src={
          src ? (typeof src === "string" ? src : URL.createObjectURL(src)) : ""
        }
        alt={alt}
        onError={handleError}
        crossOrigin="true"
        {...rest}
      />

      {isError && (
        <div
          className={`absolute inset-0 z-[1] bg-custom-accent grid items-center justify-items-center ${className}`}
        >
          <p className="text-custom-dark-gren body-regular">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Image;
