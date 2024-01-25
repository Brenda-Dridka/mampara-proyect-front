// ExtrusionFormDialog.js
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ExtrusionFormDialog = ({ open, onClose, onFormSubmit }) => {
  const [fechaTerminacion, setFechaTerminacion] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [cantidadFinal, setCantidadFinal] = useState("");

  const handleSubmit = () => {
    // Validar y procesar los datos del formulario
    const formData = {
      fechaTerminacion,
      horaTermino,
      cantidadFinal,
    };
    // Lógica adicional según tus necesidades

    // Llamar a la función de retorno proporcionada
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
    // Cerrar el diálogo
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Completa los detalles</DialogTitle>
      <DialogContent>
        {/* Agregar campos de formulario según tus necesidades */}
        <TextField
          label="Fecha de Terminación"
          type="date"
          value={fechaTerminacion}
          onChange={(e) => setFechaTerminacion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hora de Término"
          type="time"
          value={horaTermino}
          onChange={(e) => setHoraTermino(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cantidad Final"
          type="number"
          value={cantidadFinal}
          onChange={(e) => setCantidadFinal(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
