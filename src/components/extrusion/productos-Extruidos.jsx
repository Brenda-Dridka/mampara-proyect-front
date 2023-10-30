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
import "../../style/tablas/global.css";

//personalizacion de tenma

import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

// Importacion de tema personalizado

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  "&.Mui-checked": {
    color: theme.status.danger,
  },
}));

const theme = createTheme({
  status: {
    danger: blue[900],
  },
});

//
const columns = [
  { id: "clave", label: "Clave", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "extrusor", label: "Extrusor", minWidth: 100 },
  { id: "fecha_programada", label: "Fecha Programada", minWidth: 100 },
  { id: "hora_programada", label: "Hora Programada", minWidth: 100 },
  { id: "fecha_real", label: "Fecha Real", minWidth: 100 },
  { id: "hora_real", label: "Hora Real", minWidth: 100 },
  { id: "cantidad", label: "Cantidad", minWidth: 100 },
];

export default function StickyHeadTable() {
  const [productos, setProductos] = useState([]);
  console.log(productos);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/productos-extruidos")
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        setProductos(productos);
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
    <div>
      <h2>Productos Extruidos</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTable"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((productos) => {
                  return (
                    <TableRow
                      /* hover */
                      className="styleHover "
                      role="checkbox"
                      tabIndex={-1}
                      key={productos.id}
                    >
                      {columns.map((column) => {
                        const value = productos[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="styleHover2"
                          >
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
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
