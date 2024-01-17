import { Outlet } from "react-router-dom";
import bg1 from "../assets/Login/bgLogin1.png";
import bg2 from "../assets/Login/bgLogin2.png";
import bg3 from "../assets/Login/bgLogin3.png";
import { useEffect, useState } from "react";
import { SOIESLogo, TitleLogo } from "@/assets/common";

const slideImages = [
  {
    url: bg1,
    caption: "Slide 1",
  },
  {
    url: bg2,
    caption: "Slide 2",
  },
  {
    url: bg3,
    caption: "Slide 3",
  },
];

const AuthLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="grid md:grid-cols-[855fr_655fr] gap-[5rem] xl:gap-[9rem] items-stretch min-h-screen ">
      <div className="md:col-start-1 min-h-screen grid grid-cols-1 md:pl-44">
        <Outlet />
      </div>
      <div
        className="bg-custom-red rounded-3xl hidden md:grid col-start-2 absolute right-16 top-32 h-5/6 w-[calc(43.37777%_-_(5rem_*_.4337777))] xl:w-[calc(43.37777%_-_(9rem_*_.4337777))] flex flex-col justify-center items-center shadow-lg"
        style={{
          backgroundImage: `url('assets/Login/BgLogin.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="">
        <img
          src={slideImages[currentSlide].url}
          className="z-50 transition-opacity duration-500 ease-in-out w-[66rem]"
          alt={`Slide ${currentSlide + 1}`}
        />
        <img className="w-46 absolute bottom-3" src={TitleLogo}/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
