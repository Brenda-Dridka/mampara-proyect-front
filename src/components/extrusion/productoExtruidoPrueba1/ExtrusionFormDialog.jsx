import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { apiUrlProductosExtruidos } from "../../../api/extrusores/productoExtruido";

const ExtrusionFormDialog = ({
  open,
  onClose,
  etiqueta,
  productoExtruido,
  setProductoExtruido,
  onDeleteEtiqueta, // Agregar esta línea
}) => {
  const [formData, setFormData] = useState({
    nombre: etiqueta ? etiqueta.nombre : "",
    clave: etiqueta ? etiqueta.clave : "",
    cantidad: etiqueta ? etiqueta.cantidad : "",
    extrusor: etiqueta ? etiqueta.extrusor : "",
    fecha_real: etiqueta ? etiqueta.fecha_real : "",
    hora_real: etiqueta ? etiqueta.hora_real : "",
    fecha_programada: etiqueta ? etiqueta.fecha_programada : "",
    hora_programada: etiqueta ? etiqueta.hora_programada : "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (etiqueta) {
      setFormData({
        nombre: etiqueta.nombre,
        clave: etiqueta.clave,
        cantidad: etiqueta.cantidad,
        extrusor: etiqueta.extrusor,
        fecha_real: etiqueta.fecha_real,
        hora_real: etiqueta.hora_real,
        fecha_programada: etiqueta.fecha_programada,
        hora_programada: etiqueta.hora_programada,
      });
    }
  }, [etiqueta]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setAlertMessage("");
    setSuccessMessage("");
  };

  const handleSave = async () => {
    try {
      // Validación: Verificar si todos los campos requeridos están llenos
      const requiredFields = [
        "nombre",
        "clave",
        "extrusor",
        "cantidad",
        "fecha_real",
        "hora_real",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        console.error("Por favor, complete todos los campos requeridos.");
        setAlertMessage("Todos los campos obligatorios deben estar llenos.");
        return;
      }

      const dataToSave = {
        ...formData,
        fecha_programada: "",
        hora_programada: "",
      };

      await axios.post(apiUrlProductosExtruidos, dataToSave);

      console.log("Datos del formulario guardados con éxito:", formData);

      // Eliminar la etiqueta después de guardar los datos
      if (onDeleteEtiqueta) {
        onDeleteEtiqueta();
      }

      setSuccessMessage("Datos guardados con éxito");
    } catch (error) {
      console.error("Error al guardar los datos del formulario", error);
      setAlertMessage("Error al guardar los datos del formulario");
    }

    if (!alertMessage && !successMessage) {
      handleClose();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Extruir producto"}</DialogTitle>

      <DialogContent>
        <div className="posicionamientoEtiquetas">
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Clave"
            type="text"
            fullWidth
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
          />
          <TextField
            disabled
            margin="dense"
            label="Extrusor"
            type="text"
            fullWidth
            name="extrusor"
            value={formData.extrusor}
            onChange={handleInputChange}
          />
        </div>
        <div className="sepadadorInferior">
          <TextField
            margin="dense"
            label="Cantidad"
            type="text"
            fullWidth
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            style={{ width: "34%" }}
          />

          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            name="fecha_real"
            value={formData.fecha_real}
            onChange={handleInputChange}
            style={{ width: "34%" }}
          />
          <TextField
            margin="dense"
            label="Hora real"
            type="time"
            name="hora_real"
            value={formData.hora_real}
            onChange={handleInputChange}
            style={{ width: "34%" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={handleSave}>
          {"Guardar"}
        </Button>
      </DialogActions>

      {/* Snackbar para mostrar el mensaje de alerta */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={alertMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleClose}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={successMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
