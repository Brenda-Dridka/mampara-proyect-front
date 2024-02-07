import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AiOutlineFileDone } from "react-icons/ai";

export default function BasicPopover({
  onDeleteClick,
  onEstadoChange,
  onEditClick,
  onExtrudeClick,
  id, // Agregar id como una propiedad
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
    handleClose();
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick();
    }
    handleClose();
  };

  const handleEstadoChangeClick = () => {
    if (onEstadoChange) {
      onEstadoChange();
    }
    handleClose();
  };

  const handleEditClick2 = () => {
    if (onExtrudeClick) {
      onExtrudeClick();
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="Opción"
        aria-describedby={popoverId}
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          style={{
            display: "grid",
          }}
        >
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
          <IconButton onClick={handleEditClick}>
            <EditIcon style={{ color: "F5B707" }} />
          </IconButton>
          <IconButton onClick={handleEstadoChangeClick}>
            <CheckCircleIcon style={{ color: "5DBF00" }} />
          </IconButton>
          {id === 1 && ( // Renderizar AiOutlineFileDone solo para id 1
            <IconButton onClick={handleEditClick2}>
              <AiOutlineFileDone color="#8D31F7" />
            </IconButton>
          )}
        </div>
      </Popover>
    </div>
  );
}
