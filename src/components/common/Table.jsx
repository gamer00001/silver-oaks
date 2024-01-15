import * as React from "react";
import Paper from "@mui/material/Paper";
import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";
import { Typography } from "@mui/material";

const Table = ({ columns, rows, title, description }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <div className="p-8">

       <Typography  variant="h2" component="div" className='pb-8'>
         {title}
        </Typography>
        <Typography variant='h5' color="text.secondary">
          {description}
        </Typography>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MUITable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={`min-w-${column.minWidth}`}
                >
                  <Typography fontSize={20}>{column.label}</Typography>
                </TableCell>
              ))}
              <TableCell align={"center"} className={`min-w-40`}>
              <Typography fontSize={20}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : <Typography fontSize={14} className={`${value==='Paid'&&'text-green-600'} ${value==='Pending'&&'text-red-500'} ${value==='Receipt'&&'text-gray-500'}`}>{value}</Typography>}
                      </TableCell>
                    );
                  })}
                  <TableCell align={"center"}>
                    <div className="flex flex-row justify-center">
                      <FaEye size={25} className="hover:text-custom-dark-gren" />
                      <FaPencil size={25} className="hover:text-custom-dark-gren" />
                      <FaTrash size={25} className="hover:text-custom-dark-gren" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </MUITable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
