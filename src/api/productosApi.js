import axios from "axios";

export const fetchProductos = async () => {
  try {
    const response = await fetch(
      "https://mampara-backend-nu.vercel.app/productos"
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
