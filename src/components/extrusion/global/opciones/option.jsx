import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

import Tooltip from "@mui/material/Tooltip";

import PermisoValidator from "../../../login/PermissionValidator";

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
    <>
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
          <Tooltip title="Eliminar" placement="right">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </Tooltip>
          <PermisoValidator permiso="extrusores.editar">
            <Tooltip title="Editar" placement="right">
              <IconButton onClick={handleEditClick}>
                <EditIcon style={{ color: "F5B707" }} />
              </IconButton>
            </Tooltip>
          </PermisoValidator>
          <Tooltip title="Pendiente" placement="right">
            <IconButton onClick={handleEstadoChangeClick}>
              <BsClockHistory style={{ color: "5DBF00" }} />
            </IconButton>
          </Tooltip>
          {id === 1 && ( // Renderizar AiOutlineFileDone solo para id 1
            <Tooltip title="Termino de extruir" placement="right">
              <IconButton onClick={handleEditClick2}>
                <AiOutlineFileDone color="#8D31F7" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Popover>
    </>
  );
}
