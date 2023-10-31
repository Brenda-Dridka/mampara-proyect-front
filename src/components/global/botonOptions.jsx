import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { SlOptionsVertical } from "react-icons/sl";
import IconButton from "@mui/material/IconButton";
import { MdPendingActions } from "react-icons/md";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PositionedPopper({ etiqueta, onDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [labelColor, setLabelColor] = React.useState("#ffffff"); // Estado para el color de la etiqueta

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleDelete = () => {
    if (etiqueta) {
      // Realiza una solicitud DELETE para eliminar la etiqueta utilizando Axios
      axios
        .delete(`http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`)
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

  const handleSetPending = () => {
    if (etiqueta) {
      // Realiza una solicitud PUT para actualizar el estado a "pendiente"
      axios
        .put(`http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`, {
          estado: "pendiente",
        })
        .then((response) => {
          if (response.status === 200) {
            // Actualiza el color de la etiqueta
            /*   setLabelColor("#FFCC00"); */
          } else {
            console.error("No se pudo cambiar el estado de la etiqueta.");
          }
        })
        .catch((error) => {
          console.error("Error al cambiar el estado de la etiqueta", error);
        });
    }
  };
  const handleSetPending2 = () => {
    if (etiqueta) {
      // Realiza una solicitud PUT para actualizar el estado a "pendiente"
      axios
        .put(`http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`, {
          estado: "activo",
        })
        .then((response) => {
          if (response.status === 200) {
            // Actualiza el color de la etiqueta
            /*   setLabelColor("#FFCC00"); */
          } else {
            console.error("No se pudo cambiar el estado de la etiqueta.");
          }
        })
        .catch((error) => {
          console.error("Error al cambiar el estado de la etiqueta", error);
        });
    }
  };

  return (
    <Box sx={{ width: 40 }}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ backgroundColor: labelColor }}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>

              <IconButton size="small" onClick={handleSetPending}>
                <MdPendingActions color="#FFBC00" />
              </IconButton>
              <IconButton size="small" onClick={handleSetPending2}>
                <CheckCircleIcon style={{ color: "#5DBF00" }} />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid container justifyContent="center" style={{ width: "20px" }}>
        <Grid item container xs={1} alignItems="flex-end" direction="column">
          <IconButton onClick={handleClick("right-end")} size="small">
            <SlOptionsVertical />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
