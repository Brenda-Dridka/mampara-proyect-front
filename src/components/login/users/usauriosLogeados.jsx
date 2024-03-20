// usuariosLogeados.jsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { useUser } from "./UserContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";

function UsuariosLogeados() {
  const { username } = useUser();

  // Obtener la inicial del nombre de usuario en mayúsculas
  const userInitial = username ? username.charAt(0).toUpperCase() : "";

  return (
    <div
      style={{
        display: "flex",
        fontSize: "23px",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      <Avatar sx={{ bgcolor: deepPurple[500] }}>{userInitial}</Avatar>
      {username}
    </div>
  );
}

export default UsuariosLogeados;
