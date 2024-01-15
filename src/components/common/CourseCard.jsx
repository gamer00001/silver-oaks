import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CourseCard = ({ img, title, location, id }) => {
  return (
    <Link
      className="px-[2rem] py-[1rem] rounded-[.8rem] text-[1.6rem] font-bold leading-[120%] text-custom-dark-gren hover:opacity-70 transition-opacity duration-300"
      to={`/course/lectures/${id}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation to play on mount
        transition={{ duration: 0.5 }} // Duration of the animation
        className="w-full shadow-[0px_2px_10px_0px_rgba(57,_85,_86,_0.25)] bg-white rounded-[.8rem] grid gap-[1.6rem] overflow-hidden pb-[2.2rem]"
      >
        <motion.div
          initial={{ opacity: 0 }} // Initial animation state
          animate={{ opacity: 1 }} // Animation to play on mount
          transition={{ duration: 0.5, delay: 0.2 }} // Duration of the animation with a delay
          className="relative"
        >
          <img
            className="w-full h-[26.5rem] object-cover object-center"
            src={img}
            alt={title || "--"}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation to play on mount
          transition={{ duration: 0.5, delay: 0.4 }} // Duration of the animation with a delay
          className="px-[1.6rem] grid gap-[2.4rem] items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation to play on mount
            transition={{ duration: 0.5, delay: 0.6 }} // Duration of the animation with a delay
            className="grid gap-[1.2rem] items-start"
          >
            <h2 className="caption text-custom-black line-clamp-1">
              {title || "--"}
            </h2>
            <p className="overline-custom text-custom-dark-gren">
              {location || "--"}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
