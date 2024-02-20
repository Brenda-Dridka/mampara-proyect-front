// PrivateRoute.jsx
import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  return authenticated ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};
export default PrivateRoute;
