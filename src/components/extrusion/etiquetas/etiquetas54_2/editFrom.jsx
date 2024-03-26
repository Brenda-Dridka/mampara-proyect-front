import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const ExtrusionFormDialog = ({
  open,
  onClose,
  etiqueta,
  editedKilosGreater,
}) => {
  const [formData, setFormData] = useState({
    nombre: etiqueta ? etiqueta.nombre : "",
    clave: etiqueta ? etiqueta.clave : "",
    kilos: etiqueta ? etiqueta.kilos : "",
    fecha: etiqueta ? etiqueta.fecha : "",
    fecha_entrega: etiqueta ? etiqueta.fecha_entrega : "",
    polvos: etiqueta ? etiqueta.polvos : "",
  });

  const [kilosColor, setKilosColor] = useState("");

  const [tienePolvos, setTienePolvos] = useState(
    etiqueta && etiqueta.polvos === true
  );

  useEffect(() => {
    /*     console.log("Etiqueta:", etiqueta);
    console.log("Polvos:", etiqueta ? etiqueta.polvos : null); */
    if (etiqueta) {
      setFormData({
        nombre: etiqueta.nombre,
        clave: etiqueta.clave,
        kilos: etiqueta.kilos,
        fecha: etiqueta.fecha,
        fecha_entrega: etiqueta.fecha_entrega,
      });
      setTienePolvos(etiqueta.polvos === true);
    }
  }, [etiqueta]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "kilos" && parseFloat(value) > parseFloat(formData.kilos)) {
      setKilosColor("lightgreen");
      // Establecer editedKilosGreater a true si la cantidad editada es mayor
      editedKilosGreater(true);
    } else {
      setKilosColor("");
      // Establecer editedKilosGreater a false si la cantidad editada es menor o igual
      editedKilosGreater(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/etiquetasExt54_2/${etiqueta.id}`,
        { ...formData, polvos: tienePolvos ? 1 : 0 },
        (window.location.href = "/mampara")
      );
      console.log("Datos actualizados:", response.data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Editar Etiqueta"}</DialogTitle>

      <DialogContent>
        <div
          className="posicionamientoEtiquetas"
          style={{
            display: "grid",
            justifyItems: "center",
          }}
        >
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
            style={{
              width: "400px",
            }}
          />
          <TextField
            disabled
            margin="dense"
            label="Clave"
            type="text"
            fullWidth
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
            style={{
              width: "150px",
            }}
          />
        </div>
        <hr className="linea-etiqueta " />

        <FormControlLabel
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          value="end"
          control={
            <Checkbox
              checked={tienePolvos}
              onChange={(event) => setTienePolvos(event.target.checked)}
            />
          }
          label="POLVOS"
          labelPlacement="end"
        />

        <hr className="linea-etiqueta " />
        <div className="sepadadorInferior">
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Fecha de Orden"
            type="text"
            fullWidth
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Fecha entrega"
            type="date"
            fullWidth
            name="fecha_entrega"
            value={formData.fecha_entrega}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Kilos"
            type="text"
            fullWidth
            name="kilos"
            value={formData.kilos}
            onChange={handleInputChange}
            style={{
              backgroundColor: kilosColor ? "lightgreen" : "",
            }}
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
        </Button>{" "}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleUpdate();
          }}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
