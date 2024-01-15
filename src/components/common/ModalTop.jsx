import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";

export const ModalTopStyled = styled(Modal)`
  & > .MuiModal-backdrop {
    opacity: 0 !important;
    transition: none;
  }
`;

const ModalTop = ({ children, open, onClose, className = "" }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    if (open) {
      setIsModalShow(true);
    } else {
      const timeout = setTimeout(() => {
        setIsModalShow(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    isModalShow && (
      <ModalTopStyled open={isModalShow}>
        <AnimatePresence>
          {open && (
            <motion.div className="outline-none">
              <motion.div
                className="bg-black/50 z-[1300] inset-0 fixed"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              ></motion.div>
              <motion.div
                className={`z-[1300] relative m-[2.5rem_auto] bg-white rounded-[.4rem] max-w-[50rem] w-[95vw] max-h-[calc(100vh_-_5rem)] overflow-auto scrollbar ${className}`}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalTopStyled>
    )
  );
};

export default ModalTop;
