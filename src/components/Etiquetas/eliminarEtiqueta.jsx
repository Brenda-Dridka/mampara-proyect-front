import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function AlertDialog({ etiqueta, onDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (etiqueta) {
      // Realiza una solicitud DELETE para eliminar la etiqueta utilizando Axios
      axios
        .delete(`https://mampara-backend.vercel.app/etiquetas/${etiqueta.id}`)
        .then((response) => {
          if (response.status === 200) {
            // Llama a la función onDelete para eliminar la etiqueta del estado principal
            onDelete(etiqueta.id);
          } else {
            console.error("No se pudo eliminar la etiqueta.");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la etiqueta", error);
        });
    }
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Desea eliminar el producto ?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Eliminar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
