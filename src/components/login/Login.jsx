// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api/login/usuario";
import "../../style/login/login.css";
import { red } from "@mui/material/colors";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const users = await axios.get(apiUrl);
      const user = users.data.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Login successful
        navigate(`/mampara`);
      } else {
        // Credenciales incorrectas
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejar el error de manera apropiada, por ejemplo, mostrar un mensaje de error
      setError("Error al iniciar sesión");
    }
  };

  return (
    <>
      <div className="body" style={{ display: "grid" }}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>{" "}
    </>
  );
};

export default Login;
