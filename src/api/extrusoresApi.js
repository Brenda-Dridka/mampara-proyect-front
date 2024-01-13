import axios from "axios";

const apiUrl = "https://mampara-backend.vercel.app/etiquetas";

export const fetchEtiquetas = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createEtiqueta = async (etiquetaData) => {
  const response = await fetch("https://mampara-backend.vercel.app/etiquetas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etiquetaData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  const newEtiqueta = await response.json();
  return newEtiqueta;
};

// api.js
export const fetchProductos = async () => {
  try {
    const response = await fetch(
      "https://mampara-backend.vercel.app/productos"
    );
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
