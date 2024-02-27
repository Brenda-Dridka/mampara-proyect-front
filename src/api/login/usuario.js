// api.js
import axios from "axios";

export const apiUrl = "https://mampara-backend.vercel.app/users";

export const fetchUsuarios = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await fetch("https://mampara-backend.vercel.app/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  const newEtiqueta = await response.json();
  return newEtiqueta;
};
