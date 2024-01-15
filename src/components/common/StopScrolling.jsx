import { Modal, styled } from "@mui/material";

const MyModal = styled(Modal)`
  position: fixed;
  top: -10000rem;
  left: -10000rem;
  opacity: 0;
  overflow: hidden;
  width: 0;
  height: 0;
  z-index: -1100000;
`;

const StopScrolling = ({ open }) => {
  return (
    <MyModal open={open} onClose={() => {}}>
      <div></div>
    </MyModal>
  );
};

export default StopScrolling;
