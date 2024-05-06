export const MockAnnouncementsData = (handleModal) => {
  return [
    {
      id: 1,
      title: "Final Exam routine been published",
      publishDate: "22-02-2024",
      visibleTo: "Students, Teachers",
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            alt="delete"
            title="Delete"
            src="/delete-action.svg"
            className="cursor-pointer"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 2,
      title: "Final Exam routine been published",
      publishDate: "22-02-2024",
      visibleTo: "Students, Teachers",
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            alt="delete"
            title="Delete"
            src="/delete-action.svg"
            className="cursor-pointer"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 3,
      title: "Final Exam routine been published",
      publishDate: "22-02-2024",
      visibleTo: "Students, Teachers",
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            alt="delete"
            title="Delete"
            src="/delete-action.svg"
            className="cursor-pointer"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
  ];
};
