import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { BsArrowDownUp } from "react-icons/bs";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTagDialog({ etiqueta, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [updatedTag, setUpdatedTag] = useState({ ...etiqueta });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (etiqueta) {
      // Realiza una solicitud PUT para actualizar la etiqueta utilizando Axios
      axios
        .put(
          `http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`,
          updatedTag
        )
        .then((response) => {
          if (response.status === 200) {
            onUpdate(updatedTag);
            handleClose();
          } else {
            console.error("No se pudo editar la etiqueta.");
          }
        })
        .catch((error) => {
          console.error("Error al editar la etiqueta", error);
        });
    }
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen} size="small">
        <BsArrowDownUp color="#2EB933" />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Editar Etiqueta"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nuevo Nombre de Etiqueta"
            variant="outlined"
            value={updatedTag.nombre}
            onChange={(e) => {
              setUpdatedTag({
                ...updatedTag,
                nombre: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Fecha"
            variant="outlined"
            value={updatedTag.fecha || ""}
            onChange={(e) => {
              setUpdatedTag({
                ...updatedTag,
                fecha: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Kilos"
            variant="outlined"
            value={updatedTag.kilos || ""}
            onChange={(e) => {
              setUpdatedTag({
                ...updatedTag,
                kilos: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar Cambios</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
