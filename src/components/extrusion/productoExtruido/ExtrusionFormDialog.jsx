import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ExtrusionFormDialog = ({ open, onClose, onFormSubmit, selectedItem }) => {
  const [formData, setFormData] = useState({
    fecha_programada: "",
    hora_programada: "",
    fecha_real: "",
    hora_real: "",
    cantidad: "",
  });

  useEffect(() => {
    // Actualiza el formulario con los datos de la etiqueta seleccionada
    if (selectedItem) {
      setFormData({
        fecha_programada: "", // o establece un valor predeterminado
        hora_programada: "",
        fecha_real: "",
        hora_real: "",
        cantidad: "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Aquí deberías agregar la lógica para guardar los datos en el estado o realizar acciones adicionales
    onFormSubmit(formData);

    // Cierra el diálogo después de guardar
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Formulario de Extrusión</DialogTitle>
      <DialogContent>
        {/* Mostrar la información de la etiqueta seleccionada */}
        <p>Nombre: {selectedItem?.nombre}</p>
        <p>Clave: {selectedItem?.clave}</p>
        <p>Extrusor: {selectedItem?.extrusor}</p>

        {/* Formulario para la fecha, hora y cantidad */}
        <TextField
          label="Fecha programada"
          type="date"
          name="fecha_programada"
          value={formData.fecha_programada}
          onChange={handleChange}
        />
        <TextField
          label="Hora programada"
          type="time"
          name="hora_programada"
          value={formData.hora_programada}
          onChange={handleChange}
        />
        <TextField
          label="Fecha real"
          type="date"
          name="fecha_real"
          value={formData.fecha_real}
          onChange={handleChange}
        />
        <TextField
          label="Hora real"
          type="time"
          name="hora_real"
          value={formData.hora_real}
          onChange={handleChange}
        />
        <TextField
          label="Cantidad"
          type="text"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
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
