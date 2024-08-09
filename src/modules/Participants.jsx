import EditIcon from "@/assets/Icons/EditIcon";
import Trashcan from "@/assets/Icons/Trashcan";
import { DeleteModal, MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Participants = () => {
  const { page } = useQueryParams({ page: 1, query: "" });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8 mt-12">
        <SearchForm />
        <MyPagination page={page} totalPages={10 || 0} />
      </div>

      <div className="grid grid-cols-1 w-full mt-7">
        <Table />
      </div>
    </div>
  );
};

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });

  const data = [
    // {
    //   id: "276354723",
    //   fullName: "John Roe",
    //   rollNo: "453",
    //   role: "Student",
    //   group: "No Groups",
    //   status: "Active",
    // },
    // {
    //   id: "276354723",
    //   fullName: "John Roe",
    //   rollNo: "453",
    //   role: "Student",
    //   group: "No Groups",
    //   status: "Active",
    // },
    // {
    //   id: "276354723",
    //   fullName: "John Roe",
    //   rollNo: "453",
    //   role: "Student",
    //   group: "No Groups",
    //   status: "Active",
    // },
    // {
    //   id: "276354723",
    //   fullName: "John Roe",
    //   rollNo: "453",
    //   role: "Student",
    //   group: "No Groups",
    //   status: "Active",
    // },
  ];

  const navigate = useNavigate();
  const { id, aid } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table text-[2rem]">
          <thead>
            <tr className="tr">
              <th className="p-9 th">Full Name</th>
              <th className="p-9 th">Roll No</th>
              <th className="p-9 th">Roles</th>
              <th className="p-9 th">Groups</th>
              <th className="p-9 th">Status</th>
              <th className="p-9 th">
                <Trashcan />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((b, i) => (
              <tr key={i} className="tr">
                <td className="p-9 td w-[400px]">
                  <div className="flex items-center gap-2">
                    {" "}
                    <img
                      className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
                      src={
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Admin"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                    <p className="w-[100px]">{b?.fullName || "--"}</p>
                  </div>
                </td>
                <td className="p-9 td w-[200px]">{b?.rollNo || "--"}</td>
                <td className="p-9 td w-[200px]">{b?.role || "--"}</td>
                <td className="p-9 td w-[200px]">{b?.group || "--"}</td>
                <td className="p-9 td w-[200px]">{b?.status || "--"}</td>
                <td
                  className="p-9 td w-[200px] text-center hover:text-red-700 cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trashcan />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onOkay={() => {
            setIsDeleteModalOpen(null);
            onDelete && onDelete();
          }}
          open={isDeleteModalOpen}
        />
      </div>
    </>
  );
};

export default Participants;
