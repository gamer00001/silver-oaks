import { Loader, MyPagination } from "@/components/common";
import { useQueryParams } from "@/hooks";
import { getAcademicRecord } from "@/store/actions/academicRecord";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AcademicOptions = [
  {
    title: "Assignments",
    value: "assignment",
  },
  {
    title: "Quizzes",
    value: "quiz",
  },
  {
    title: "Exam",
    value: "exam",
  },
  {
    title: "OGA",
    value: "oga",
  },
  {
    title: "All",
    value: "all",
  },
];

const Mock_Table_Data = [
  {
    name: "John Roe",
    date: "1-03-2024",
    marks: "8/10",
    feedback: "your quiz showcased a remarkable grasp of the material",
  },
  {
    name: "John Roe",
    date: "1-03-2024",
    marks: "8/10",
    feedback: "your quiz showcased a remarkable grasp of the material",
  },
  {
    name: "John Roe",
    date: "1-03-2024",
    marks: "8/10",
    feedback: "your quiz showcased a remarkable grasp of the material",
  },
  {
    name: "John Roe",
    date: "1-03-2024",
    marks: "8/10",
    feedback: "your quiz showcased a remarkable grasp of the material",
  },
];

const StudentGrades = () => {
  const [state, setState] = useState({
    term: "All",
    tableData: [],
    academicCategory: "all",
  });

  const { page } = useQueryParams({ page: 0, query: "" });

  const dispatch = useDispatch();

  const { academicRecordData } = useSelector((s) => s.academicRecordReducer);

  const handleAcademicTerm = (e) => {
    setState((prev) => ({
      ...prev,
      term: e.target.value,
    }));
  };

  const handleAcademicType = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      academicCategory: selectedValue,
    }));
  };

  const prepareAssignmentData = (data) => {
    return data
      ? data.map((item) => ({
          name: item?.assignmentTitle || "--",
          date: item.date || "--",
          marks: item.obtainedMarks || "--",
          feedback: item.comments || "--",
        }))
      : [];
  };

  const prepareExamData = (data) => {
    return data
      ? data.map((item) => ({
          name: item?.examTitle || "--",
          date: item.date || "--",
          marks: item.obtainedMarks || "--",
          feedback: item.comments || "--",
        }))
      : [];
  };

  const prepareOgaData = (data) => {
    return data
      ? data.map((item) => ({
          name: item?.ogaTitle || "--",
          date: item.date || "--",
          marks: item.gainedMarks || "--",
          feedback: item.comments || "--",
        }))
      : [];
  };

  const prepareQuizData = (data) => {
    return data
      ? data.map((item) => ({
          name: item?.quizTitle || "--",
          date: item.date || "--",
          marks: item.gainedMarks || "--",
          feedback: item.comments || "--",
        }))
      : [];
  };

  const parseTableData = (apiData) => {
    const { academicCategory } = state;

    switch (academicCategory) {
      case "assigment":
        return setState((prev) => ({
          ...prev,
          tableData: prepareAssignmentData(
            apiData?.assignmentSubmissions || []
          ),
        }));
      case "exam":
        return setState((prev) => ({
          ...prev,
          tableData: prepareExamData(apiData?.examSubmissions || []),
        }));
      case "oga":
        return setState((prev) => ({
          ...prev,
          tableData: prepareOgaData(apiData?.ogaSubmissions || []),
        }));
      case "quiz":
        return setState((prev) => ({
          ...prev,
          tableData: prepareQuizData(apiData?.quizSubmissions || []),
        }));
      case "all":
        return setState((prev) => ({
          ...prev,
          tableData: [
            ...(apiData?.quizSubmissions || []),
            ...(apiData?.ogaSubmissions || []),
            ...(apiData?.examSubmissions || []),
            ...(apiData?.assignmentSubmissions || []),
          ],
        }));
      default:
        return;
    }
  };

  useEffect(() => {
    const studentInfo = JSON.parse(localStorage.getItem("userInfo")) ?? {};

    dispatch(
      getAcademicRecord({
        onSuccess: (res) => {
          parseTableData(res);
        },
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            page: page,
            size: 10,
            academicCategory: state.academicCategory,
            term: state.term === "All" ? "all" : state.term,
            studentRollNumber: studentInfo?.rollNumber,
          },
          dispatch,
        },
      })
    );
  }, [state.academicCategory, state.term]);

  return (
    <div>
      {/* <div className="flex items-center gap-10 justify-start">
        <SearchForm />
      </div> */}

      <div className="flex flex-row justify-start gap-10 items-center mb-8 pt-5 lg:mt-4">
        <div class="flex flex-row gap-6">
          <RadioGroup
            selectionOption={state.academicCategory}
            optionsList={AcademicOptions}
            onChange={(selectedOption) => {
              handleAcademicType(selectedOption?.value);
            }}
          />
        </div>

        <div className="md:flex">
          <select
            // value={state.term}
            defaultValue={state.term}
            // defaultChecked={state.term}
            className="text-[2rem] border border-custom-golden border-solid p-2 rounded-2xl cursor-pointer"
            onChange={handleAcademicTerm}
          >
            <option>Term 01</option>
            <option>Term 02</option>
            <option>Term 03</option>
            <option>All</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full">
        <Table
          page={page}
          columns={["Name", "Date", "Marks", "Feedback"]}
          rows={state.tableData.length > 0 ? state.tableData : []}
        />
      </div>

      {academicRecordData.loading && <Loader type="screen" />}
    </div>
  );
};

export default StudentGrades;

const RadioGroup = ({ optionsList = [], selectionOption, onChange }) => {
  return (
    <>
      {optionsList.map((option, index) => (
        <label className="inline-flex items-center" key={index}>
          <input
            type="radio"
            name="options"
            className="form-radio h-6 w-6"
            checked={selectionOption === option.value}
            onChange={() => {
              onChange(option);
            }}
          />
          <span className="ml-2 text-xl">{option.title}</span>
        </label>
      ))}
    </>
  );
};

const Table = ({ columns, rows, page }) => {
  const exportData = () => {
    const exportedData = data.map((item) => ({
      FullName: item.fullName || "--",
      RollNo: item.rollNo || "--",
      Quiz1: item.quiz1 || "--",
      TermExam1: item.term1 || "--",
      TermExam2: item.term2 || "--",
      CourseTotal: item.total || "--",
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(exportedData[0])
        .map((key) => key)
        .join(",") +
      "\n" +
      exportedData.map((obj) => Object.values(obj).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "academic_record.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table text-[2rem]">
          <thead>
            <tr className="tr">
              {columns.map((column) => (
                <th className="p-9 th" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((b, i) => (
              <tr key={i} className="tr">
                <td className="p-9 td text-center">{b?.title || "--"}</td>
                <td className="p-9 td text-center">{b?.date || "--"}</td>
                <td className="p-9 td text-center">{b?.gainedMarks || "--"}</td>
                <td className="p-9 td text-center">{b?.feedback || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!isEmpty(rows) && (
          <div className="grid gap-[3.2rem] justify-end grid-cols-[auto_auto] items-center mt-16">
            <button
              className="p-[1.3rem_2.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
              type="submit"
              onClick={exportData}
            >
              Download Excel
            </button>

            <MyPagination page={page} totalPages={10 || 0} />
          </div>
        )}
      </div>
    </>
  );
};
