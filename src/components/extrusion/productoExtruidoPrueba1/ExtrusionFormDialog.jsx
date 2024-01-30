import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { fetchProductoExtruidos } from "../../../api/extrusores/productoExtruido"; // Import the fetch function

const ExtrusionFormDialog = ({ open, onClose, onFormSubmit, selectedItem }) => {
  const [formData, setFormData] = useState({
    fecha_real: "",
    hora_real: "",
    cantidad: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the data for the selected item
      const data = await fetchProductoExtruidos();
      console.log("Data from API:", data);

      const selectedData = data.find((item) => item.id === selectedItem.id);
      console.log("Selected Data:", selectedData);

      // Update the form data with the selected item's data
      if (selectedData) {
        setFormData({
          fecha_real: selectedData.fecha_real || "",
          hora_real: selectedData.hora_real || "",
          cantidad: selectedData.cantidad || "",
          // Agrega otros campos necesarios
        });
      }
    };

    if (selectedItem) {
      console.log("Selected Item:", selectedItem);
      fetchData();
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      // Add logic to save the data to the state or perform additional actions
      await onFormSubmit(formData);

      // Close the dialog after saving
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Extrusion Form</DialogTitle>
      <DialogContent>
        {/* Display information about the selected item */}
        <p>Nombre: {selectedItem?.nombre}</p>
        <p>Clave: {selectedItem?.clave}</p>
        <p>EXTRUSOR: {selectedItem?.extrusor}</p>

        {/* Form for date, time, and quantity */}
        <TextField
          label="Real Date"
          type="date"
          name="fecha_real"
          value={formData.fecha_real}
          onChange={handleChange}
        />
        <TextField
          label="Real Time"
          type="time"
          name="hora_real"
          value={formData.hora_real}
          onChange={handleChange}
        />
        <TextField
          label="Quantity"
          type="text"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
