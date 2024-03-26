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
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

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

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "apellido", label: "Apellido", minWidth: 100 },
  { id: "username", label: "Nombre de Usuario", minWidth: 100 },
  { id: "rol", label: "Rol", minWidth: 100 },
  { id: "permisos", label: "Permisos", minWidth: 100 },
];

export default function StickyHeadTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuariosData();
  }, []);

  const fetchUsuariosData = async () => {
    try {
      const response = await fetch("https://mampara-backend.vercel.app/users");
      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const usuariosData = await response.json();
      setUsuarios(usuariosData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setLoading(false);
    }
  };

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
      <h2>User</h2>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
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
                {usuarios
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((usuario) => {
                    return (
                      <TableRow
                        className="styleHover "
                        role="checkbox"
                        tabIndex={-1}
                        key={usuario.id}
                      >
                        {columns.map((column) => {
                          const value = usuario[column.id];
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
            count={usuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}
