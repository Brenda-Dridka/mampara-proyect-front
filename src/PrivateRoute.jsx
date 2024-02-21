// PrivateRoute.jsx
import React from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  const navigate = useNavigate(); // Mueve la declaración de useNavigate aquí

  return authenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
