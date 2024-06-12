import { MyPagination } from ".";

const CustomTable = ({ columns = [], rows = [], page = 0, totalPages = 1 }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table text-[2rem]">
          <thead>
            <tr className="tr">
              {columns.map((column) => (
                <th className="p-9 th" key={column.header}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className="tr">
                {columns.map((column) => (
                  <td className="p-9 td text-center" key={column.key}>
                    {row[column.key] || "--"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-12 float-right">
          <MyPagination page={page} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default CustomTable;
