import Button from "../common/Button";

const DeleteActionModal = ({ disabled, handleAction, handleModal }) => {
  return (
    <div className="p-10">
      <div className="text-custom-red font-bold text-center text-6xl">
        Alert
      </div>

      <div className="text-black font-normal text-center text-3xl py-8">
        Are you sure you want to delete this?
      </div>

      <div className="flex flex-col gap-8">
        <Button
          variant="primary"
          disabled={disabled}
          size="large"
          onClick={handleAction}
        >
          Yes, Delete
        </Button>

        <Button
          variant="secondary"
          disabled={disabled}
          size="medium"
          onClick={handleModal}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteActionModal;
