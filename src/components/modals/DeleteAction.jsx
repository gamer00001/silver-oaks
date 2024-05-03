import Button from "../common/Button";

const DeleteActionModal = ({ handleModal }) => {
  return (
    <div className="p-10">
      <div className="text-custom-red font-bold text-center text-6xl">
        Alert
      </div>

      <div className="text-black font-normal text-center text-3xl py-8">
        Are you sure you want to delete Minahil Fatima from grade IV?
      </div>

      <div className="flex flex-col gap-8">
        <Button variant="primary" size="large" onClick={handleModal}>
          Yes, Delete
        </Button>

        <Button variant="secondary" size="medium" onClick={handleModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteActionModal;
