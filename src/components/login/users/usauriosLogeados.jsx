// usuariosLogeados.jsx
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { useUser } from "./UserContext";

function UsuariosLogeados() {
  const { username } = useUser();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <AccountCircleIcon />
      {username}
    </div>
  );
}

export default UsuariosLogeados;
