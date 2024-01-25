// BasicPopover.js
import * as React from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../../../../../style/cards.css";
import { AiOutlineFileDone } from "react-icons/ai";

export default function BasicPopover({ onDeleteClick, onEstadoChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="Option"
        aria-describedby={id}
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </IconButton>
      <Popover
        id={id}
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
          <IconButton>
            <EditIcon s />
          </IconButton>
          <IconButton onClick={onEstadoChange}>
            <CheckCircleIcon style={{ color: "5DBF00" }} />
          </IconButton>
          <IconButton>
            <AiOutlineFileDone color="#8D31F7" />
          </IconButton>
        </div>
      </Popover>
    </div>
  );
}
