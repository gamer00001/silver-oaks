import EditIcon from "@/assets/Icons/EditIcon";
import { isEmpty } from "lodash";
import moment from "moment";

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
    section: studentData?.sectionName ?? "N/A",
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
            // const { password, ...otherInfo } = studentData;
            handleModal(
              "addNewModalIsOpen",
              { ...studentData, section: studentData?.sectionName },
              true
            );
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            // const { password, ...otherInfo } = studentData;
            handleModal("deleteModalIsOpen", studentData);
          }}
        />
      </div>
    ),
  }));
};

export const parseLectureListing = (data = [], handleModal) => {
  return data?.map((lectureData) => ({
    ...lectureData,
    title: lectureData?.lectureTitle ?? "N/A",
    publishedDate: lectureData?.publishDate ?? "N/A",
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
            // const { password, ...otherInfo } = lectureData;
            handleModal(
              "addNewModalIsOpen",
              { ...lectureData, section: lectureData?.sectionName },
              true
            );
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            // const { password, ...otherInfo } = lectureData;
            handleModal("deleteModalIsOpen", lectureData);
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

export const MockLecturesData = (handleModal) => {
  return [
    {
      id: 1,
      title: "Introduction To ICT",
      publishedDate: "12-09-2024",
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
      title: "Introduction To ICT",
      publishedDate: "12-09-2024",
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
      title: "Introduction To ICT",
      publishedDate: "12-09-2024",
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
      id: 4,
      title: "Introduction To ICT",
      publishedDate: "12-09-2024",
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
      id: 5,
      title: "Introduction To ICT",
      publishedDate: "12-09-2024",
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

export const MockAssignmentData = (handleModal, handleViewSubmission) => {
  return [
    {
      id: 1,
      title: "Introduction To ICT",
      marks: 10,
      dueDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
        </div>
      ),
      actions: (
        <div className="flex gap-8 justify-center items-center">
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

          <span
            onClick={handleViewSubmission}
            className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
          >
            View Submissions
          </span>
        </div>
      ),
    },
    {
      id: 2,
      title: "Introduction To ICT",
      marks: 10,
      dueDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
          <span
            onClick={handleViewSubmission}
            className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
          >
            View Submissions
          </span>
        </div>
      ),
    },
    {
      id: 3,
      title: "Introduction To ICT",
      marks: 10,
      dueDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
          <span
            onClick={handleViewSubmission}
            className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
          >
            View Submissions
          </span>
        </div>
      ),
    },
    {
      id: 4,
      title: "Introduction To ICT",
      marks: 10,
      dueDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
          <span
            onClick={handleViewSubmission}
            className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
          >
            View Submissions
          </span>
        </div>
      ),
    },
    {
      id: 5,
      title: "Introduction To ICT",
      marks: 10,
      dueDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
          <span
            onClick={handleViewSubmission}
            className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
          >
            View Submissions
          </span>
        </div>
      ),
    },
  ];
};

export const parseAssignmentListing = (
  data = [],
  handleModal,
  handleViewSubmission
) => {
  return data?.map((assignmentData) => ({
    ...assignmentData,
    marks: assignmentData.totalMarks,
    title: assignmentData?.assignmentTitle ?? "N/A",
    dueDate: (
      <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
        {assignmentData?.dueDate}
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
            handleModal(
              "addNewModalIsOpen",
              { ...assignmentData, section: assignmentData?.sectionName },
              true
            );
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            handleModal("deleteModalIsOpen", assignmentData);
          }}
        />
        <span
          onClick={() => handleViewSubmission(assignmentData?.assignmentId)}
          className="text-[#7A1315] font-semibold text-2xl hover:underline cursor-pointer"
        >
          View Submissions
        </span>
      </div>
    ),
  }));
};

export const parseSubmittedAssignmentListing = (
  data = [],
  handleMarkAssignment
) => {
  return data?.map((assignmentData) => ({
    ...assignmentData,
    fullName: assignmentData?.studentName,
    rollNumber: assignmentData?.studentRollNumber,
    grade: (
      <span className="capitalize">
        {assignmentData?.obtainedGrade ?? "--"}
      </span>
    ),
    status: (
      <>
        <div
          className={`flex flex-row items-center gap-4 p-9 underline ${
            assignmentData?.obtainedMarks !== -1
              ? "text-green-700"
              : "text-red-800"
          } hover:text-gray-700 cursor-pointer`}
          onClick={() => handleMarkAssignment(assignmentData.studentRollNumber)}
        >
          {assignmentData?.obtainedMarks === -1 ? "Unmarked" : "Marked" || "--"}{" "}
          <EditIcon />
        </div>
        {/* assignmentData?.obtainedMarks === -1 ? "Unmarked" : "Marked" || "--", */}
      </>
    ),
    // status:
    // marks: assignmentData.totalMarks,
    // title: assignmentData?.assignmentTitle ?? "N/A",
  }));
};

export const MockSubmittedAssignmentData = () => {
  return [
    {
      id: 1,
      fullName: "John Roe",
      rollNumber: "123",
      status: "No Submission",
      marks: "Marked",
      grade: "A",
      submitted: "12-02-2023",
      obtainedMarks: "13",
    },
    {
      id: 2,
      fullName: "John Roe",
      rollNumber: "123",
      status: "No Submission",
      marks: "Marked",
      grade: "A",
      submitted: "12-02-2023",
      obtainedMarks: "13",
    },
    {
      id: 3,
      fullName: "John Roe",
      rollNumber: "123",
      status: "No Submission",
      marks: "Marked",
      grade: "A",
      submitted: "12-02-2023",
      obtainedMarks: "13",
    },
    {
      id: 4,
      fullName: "John Roe",
      rollNumber: "123",
      status: "No Submission",
      marks: "Marked",
      grade: "A",
      submitted: "12-02-2023",
      obtainedMarks: "13",
    },
    {
      id: 5,
      fullName: "John Roe",
      rollNumber: "123",
      status: "No Submission",
      marks: "Marked",
      grade: "A",
      submitted: "12-02-2023",
      obtainedMarks: "13",
    },
  ];
};

export const MockQuizzesData = (handleModal) => {
  return [
    {
      id: 1,
      title: "Introduction To ICT",
      visibleTo: "Teachers, Students",
      publishedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      title: "Introduction To ICT",
      visibleTo: "Teachers, Students",
      publishedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 3,
      title: "Introduction To ICT",
      visibleTo: "Teachers, Students",
      publishedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 4,
      title: "Introduction To ICT",
      visibleTo: "Teachers, Students",
      publishedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 5,
      title: "Introduction To ICT",
      visibleTo: "Teachers, Students",
      publishedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
  ];
};

export const MockExamData = (handleModal) => {
  return [
    {
      id: 1,
      title: "Mid term exam",
      marks: 10,
      uploadedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      title: "Mid term exam",
      marks: 10,
      uploadedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 3,
      title: "Mid term exam",
      marks: 10,
      uploadedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 4,
      title: "Mid term exam",
      marks: 10,
      uploadedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
      id: 5,
      title: "Mid term exam",
      marks: 10,
      uploadedDate: (
        <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
          12-02-2024
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
  ];
};

export const parseTeachersListing = (data = [], handleModal) => {
  return data?.map((teachersData) => ({
    ...teachersData,
    name: teachersData?.employee_Name ?? "N/A",
    gradeAssigned: teachersData?.gradeAssigned ?? "N/A",
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
            // const { password, ...otherInfo } = teachersData;
            handleModal("addNewModalIsOpen", teachersData, true);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            // const { password, ...otherInfo } = teachersData;
            handleModal("deleteModalIsOpen", teachersData);
          }}
        />
      </div>
    ),
  }));
};

export const parseQuizzesListing = (data = [], handleModal, navigate) => {
  return data?.map((quizData) => ({
    ...quizData,
    title: quizData?.quizTitle ?? "N/A",
    publishedDate: (
      <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
        {moment(quizData.dueDate).format("DD-MM-YYYY")}
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
            navigate(`edit/${quizData?.quizId}`);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            // const { password, ...otherInfo } = quizData;
            handleModal("deleteModalIsOpen", quizData);
          }}
        />
      </div>
    ),
  }));
};

export const parseOgaListing = (data = [], handleModal, navigate) => {
  return data?.map((ogaData) => ({
    ...ogaData,
    marks: ogaData.totalMarks,
    title: ogaData?.ogaTitle ?? "N/A",
    dueDate: (
      <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
        {moment(ogaData.dueDate).format("DD-MM-YYYY")}
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
            navigate(`edit/${ogaData?.ogaId}`);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            // const { password, ...otherInfo } = ogaData;
            handleModal("deleteModalIsOpen", ogaData);
          }}
        />
      </div>
    ),
  }));
};

export const parseExamListing = (data = [], handleModal, navigate) => {
  return data?.map((examData) => ({
    ...examData,
    marks: examData.totalMarks,
    title: examData?.examTitle ?? "N/A",
    dueDate: (
      <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
        {moment(examData.dueDate).format("DD-MM-YYYY")}
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
            navigate(`edit/${examData?.examId}`);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            handleModal("deleteModalIsOpen", examData);
          }}
        />
      </div>
    ),
  }));
};

export const studentByCourseListingParser = (data = []) => {
  return !isEmpty(data)
    ? data?.map((item) => ({
        ...item,
        section: item.sectionName,
        name: item.studentName,
        campus: item.campusName,
      }))
    : [];
};

export const parseAnnouncementListing = (data = [], handleModal, navigate) => {
  return data?.map((eventData) => ({
    ...eventData,
    title: eventData?.title ?? "N/A",
    eventDate: (
      <div className="text-[#0CAF60] text-center bg-[#E7F7EF] rounded-2xl">
        {moment(eventData.eventDate).format("DD-MM-YYYY")}
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
            handleModal("addNewModalIsOpen", { ...eventData }, true);
          }}
        />
        <img
          className="cursor-pointer"
          src="/delete-action.svg"
          alt="delete"
          title="Delete"
          onClick={() => {
            handleModal("deleteModalIsOpen", eventData);
          }}
        />
      </div>
    ),
  }));
};
