import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { SlOptionsVertical } from "react-icons/sl";
import IconButton from "@mui/material/IconButton";
import { BsArrowDownUp } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import EditarEtiqueta from "../Etiquetas/editarProducto";
import EliminacioEtiquetas from "../Etiquetas/eliminarEtiqueta";
import DeleteTagButton from "../Etiquetas/eliminarEtiqueta";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PositionedPopper({ etiqueta, onDelete }) {
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ width: 40 }}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              ;
              <IconButton size="small">
                <MdPendingActions color="#FFCC00" />
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
