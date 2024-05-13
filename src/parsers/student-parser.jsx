export const MockManageStudentsData = (handleModal) => {
  return [
    {
      id: 1,
      name: "Minahil Fatima",
      rollNumber: "10800",
      grade: "IV",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
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
      name: "Minahil Fatima",
      rollNumber: "10800",
      grade: "V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 3,
      name: "Minahil Fatima",
      rollNumber: "10800",
      grade: "V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 4,
      name: "Minahil Fatima",
      rollNumber: "10800",
      grade: "V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 5,
      name: "Minahil Fatima",
      rollNumber: "10800",
      grade: "V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
  ];
};

export const parseStudentListing = (data = [], handleModal) => {
  return data?.map((studentData) => ({
    ...studentData,
    name: studentData?.studentName ?? "N/A",
    rollNumber: studentData?.rollNumber ?? "N/A",
    grade: studentData?.grade ?? "N/A",
    lastLoggedIn: (
      <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
        N/A
      </div>
    ),
    actions: (
      <div className="flex gap-8 justify-center">
        <img
          className="cursor-pointer"
          src="/edit-action.svg"
          alt="edit"
          title="Edit"
          onClick={() => {
            const { password, ...otherInfo } = studentData;
            handleModal("addNewModalIsOpen", otherInfo, true);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            const { password, ...otherInfo } = studentData;
            handleModal("deleteModalIsOpen", otherInfo);
          }}
        />
      </div>
    ),
  }));
};

export const MockTeacherStudentsData = (handleModal) => {
  return [
    {
      id: 1,
      name: "Minahil Fatima",
      gradeAssigned: "IV,IV",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 2,
      name: "Minahil Fatima",
      gradeAssigned: "IV,V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 3,
      name: "Minahil Fatima",
      gradeAssigned: "IV,V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 4,
      name: "Minahil Fatima",
      gradeAssigned: "IV,V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
    {
      id: 5,
      name: "Minahil Fatima",
      gradeAssigned: "IV,V",
      lastLoggedIn: (
        <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
          9:45 am ,12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center">
          <img
            className="cursor-pointer"
            src="/edit-action.svg"
            alt="edit"
            title="Edit"
          />
          <img
            className="cursor-pointer"
            src="/delete-action.svg"
            alt="delete"
            title="Delete"
            onClick={() => handleModal("deleteModalIsOpen")}
          />
        </div>
      ),
    },
  ];
};

export const parseTeachersListing = (data = [], handleModal) => {
  return data?.map((teachersData) => ({
    ...teachersData,
    name: teachersData?.studentName ?? "N/A",
    rollNumber: teachersData?.rollNumber ?? "N/A",
    grade: teachersData?.grade ?? "N/A",
    lastLoggedIn: (
      <div className="text-[#FE964A] text-center bg-[#FFF0E6] rounded-2xl">
        N/A
      </div>
    ),
    actions: (
      <div className="flex gap-8 justify-center">
        <img
          className="cursor-pointer"
          src="/edit-action.svg"
          alt="edit"
          title="Edit"
          onClick={() => {
            const { password, ...otherInfo } = teachersData;
            handleModal("addNewModalIsOpen", otherInfo, true);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            const { password, ...otherInfo } = teachersData;
            handleModal("deleteModalIsOpen", otherInfo);
          }}
        />
      </div>
    ),
  }));
};
