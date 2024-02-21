// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api/login/usuario";
import "../../style/login/login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ setAuthenticated }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const users = await axios.get(apiUrl);
      const user = users.data.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        // Login successful
        setAuthenticated(true);
        sessionStorage.setItem("authenticated", "true");
        // Ahora llamamos a handleLogin después de la autenticación exitosa
        handleLoginAfterAuthentication(username);
      } else {
        // Credenciales incorrectas
        setError("Credenciales incorrectas, verificar usuario o contraseña");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejar el error de manera apropiada, por ejemplo, mostrar un mensaje de error
      setError("Error al iniciar sesión");
    }
  };

  const handleLoginAfterAuthentication = (username) => {
    // Llamar a handleLogin con el nombre de usuario
    handleLogin(username);
    // Redirigir a la página deseada
    navigate("/mampara");
  };

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("authenticated");
    if (storedAuth === "true") {
      setAuthenticated(true);
      navigate("/mampara");
    }
  }, [setAuthenticated, navigate]);

  return (
    <div>
      <div className="container">
        <div className="login-container">
          <div className="register"></div>
          <div className="login" style={{}}>
            <h2 style={{ color: "#000000" }}>Bienvenido</h2>
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle sx={{ color: "#000000", mr: 1, my: 0.5 }} />
                <TextField
                  style={{ color: "#6d6d6d !important" }}
                  id="input-with-sx"
                  label="Nombre de Usuario"
                  variant="standard"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              <br />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Contraseña
                </InputLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ color: "#6d6d6d", mr: 1, my: 0.5 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <br />
              <button
                onClick={() => handleLogin(username)}
                /* onClick={handleLogin} */
                style={{
                  width: "70%",
                  background: "#00192F",
                }}
              >
                Iniciar sesión
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
