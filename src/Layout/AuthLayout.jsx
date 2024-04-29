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
    <div className="grid md:grid-cols-[1055fr_955fr] gap-[5rem] xl:gap-[9rem] items-stretch min-h-screen ">
      <div className="flex-1 flex justify-center items-center relative">
        <Outlet />
      </div>

      {/* Right side with image */}
      <div className="flex-1 flex-col justify-center items-start relative bg-custom-red hidden md:grid col-start-2">
        <img src="/login-logo.svg" alt="Background" className="pl-16 pb-5" />

        <div className="flex flex-col items-center">
          <div className=" flex flex-col w-full pl-16 py-5">
            <span className="font-bold text-white xl:text-7xl md:text-3xl">
              Welcome to Teacher Portal
            </span>

            <span className="text-white xl:text-4xl md:text-xl pt-6">
              Login to access your account
            </span>
          </div>
          <img
            src="/student-login.svg"
            alt="Background"
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* <div
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
            className="z-50 transition-opacity duration-500 ease-in-out w-[26rem] xl:w-[46rem]"
            alt={`Slide ${currentSlide + 1}`}
          />
          <img className="w-46 absolute bottom-3" src={TitleLogo} />
        </div>
      </div> */}
    </div>
  );
};

export default AuthLayout;
