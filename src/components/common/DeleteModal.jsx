import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "@mui/material";
import { MdDelete } from "react-icons/md";

// import { ModalTop } from ".";

const DeleteModalStyled = styled.div`
  z-index: 9997;
  position: fixed;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  align-items: center;
  width: 100%;

  & > .overlay {
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 9998;
    position: fixed;
    z-index: 0;
    inset: 0;
  }

  & > .box {
    z-index: 9999;
    position: relative;
    margin: 0 auto;
    max-width: 41.6rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0.6rem;
    padding: 3.9rem;

    display: grid;
    justify-items: center;
    gap: 2.8rem;

    & > .top {
      & > .icon {
        display: grid;
        line-height: 0;
        align-items: center;
        justify-content: center;
        font-size: 7.1rem;
      }
    }
    & > .bottom {
      display: grid;
      justify-items: center;
      gap: 3.2rem;

      & > h2 {
        color: #575962;
        font-size: 1.7rem;
        font-weight: 500;
      }
      & > .bottom {
        display: grid;
        justify-items: center;
        gap: 4rem;

        & > p {
          color: #6f727d;
          font-size: 1.4rem;
          text-align: center;
        }

        & > .group {
          display: grid;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          grid-template-columns: auto auto;
          & > button {
            display: block;
            padding: 0.8rem 2.7rem;
            background-color: #3085d6;
            border-radius: 0.4rem;
            font-size: 1.3rem;
            color: #fff;

            &:hover {
              background-image: linear-gradient(
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.1)
              );
            }

            &:nth-of-type(1) {
              background-color: #f4516c;
            }
          }
        }
      }
    }
  }
`;

const MUIModalStyled = styled(Modal)`
  & > .MuiModal-backdrop {
    opacity: 0 !important;
    transition: none;
  }
`;

const MotionedDeleteModalStyled = motion(DeleteModalStyled);

const DeleteModal = ({ open, onClose, onOkay, deleteItemName = "item" }) => {
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
      <MUIModalStyled open={isModalShow}>
        <AnimatePresence>
          {open && (
            <MotionedDeleteModalStyled>
              <motion.div
                className="overlay"
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
                onClick={onClose}
              />
              <motion.div
                className="box"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    ease: "linear",
                    duration: 0.3,
                  },
                }}
              >
                <div className="top">
                  <span
                    className="grid-center p-[2rem] w-[11.1rem] h-[11.1rem] rounded-full bg-red-500 text-[white] text-[7.1rem]"
                    role="img"
                  >
                    <MdDelete />
                  </span>
                </div>
                <div className="bottom">
                  <h2 className="top">Are you sure?</h2>
                  <div className="bottom">
                    <p>You want to permanently delete this {deleteItemName}?</p>
                    <div className="group">
                      <button onClick={onClose}>Cancel</button>
                      <button onClick={onOkay}>Okay</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MotionedDeleteModalStyled>
          )}
        </AnimatePresence>
      </MUIModalStyled>
    )
  );
};

export default DeleteModal;
