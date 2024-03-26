import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import BotonAgregarProductos from "./BotonAgregarProductos";

const columns = [
  { id: "clave", label: "Clave", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "l", label: "L", minWidth: 100 },
  { id: "a", label: "A", minWidth: 100 },
  { id: "b", label: "B", minWidth: 100 },
  { id: "", label: "Option", minWidth: 100 },
];

export default function StickyHeadTable() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => {
        return response.json();
      })
      .then((articulos) => {
        setArticulos(articulos);
      });
  }, []);

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <BotonAgregarProductos />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{ backgroundColor: "red !important" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {articulos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((articulos) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={articulos.id}
                  >
                    {columns.map((column) => {
                      const value = articulos[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={articulos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
