import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../../style/formulario/formulario.css";
// Importa axios para hacer la solicitud POST
import axios from "axios";
import { useState, useEffect } from "react";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [nombre, setNombre] = useState();
  const [clave, setClave] = useState();
  const [l, setL] = useState();
  const [a, setA] = useState();
  const [b, setB] = useState();

  // Manejador para la fecha
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  // Manejador para los kilos
  const handleClaveChange = (event) => {
    setClave(event.target.value);
  };
  const handleLChange = (event) => {
    setL(event.target.value);
  };
  const handleAChange = (event) => {
    setA(event.target.value);
  };
  const handleBChange = (event) => {
    setB(event.target.value);
  };

  const handleSave = () => {
    // Crear el objeto de datos a enviar
    const data = {
      nombre: nombre,
      clave: clave,
      l: l,
      a: a,
      b: b,
    };

    axios
      .post("http://localhost:3000/productos", data)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        console.log("Producto Guardado con excito", response.data);
        handleClose();
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al guardar la etiqueta", error);
      });
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddCircleIcon />}
      >
        Agregar Productos
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Agregar Productos"}</DialogTitle>
        <DialogContent className="pocicionamiento">
          <div className="pocicionamiento">
            <TextField
              id="outlined-basic"
              label="Nombre del Producto"
              variant="outlined"
              style={{ marginTop: "1rem" }}
              onChange={handleNombreChange}
              value={nombre}
            />

            <TextField
              id="outlined-basic"
              onChange={handleClaveChange}
              label="Clave del Producto"
              variant="outlined"
              value={clave}
            />
          </div>
          <div className="posicionamientoLAB">
            <TextField
              id="outlined-basic"
              onChange={handleLChange}
              label="L"
              variant="outlined"
              className="tamañoFormulario"
              value={l}
            />

            <TextField
              id="outlined-basic"
              onChange={handleAChange}
              label="A"
              variant="outlined"
              className="tamañoFormulario"
              value={a}
            />
            <TextField
              id="outlined-basic"
              label="B"
              variant="outlined"
              className="tamañoFormulario"
              onChange={handleBChange}
              value={b}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Agregar</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
