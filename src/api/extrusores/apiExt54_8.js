// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_8 =
  "https://mampara-backend-nu.vercel.app/etiquetasExt54_8";

export const fetchEtiquetas54_8 = async () => {
  console.log("muestra data", data);
  const response = await axios.get(apiUrlEtiquetasExt54_8);
  return response.data;
};

export const createEtiqueta54_8 = async (etiqueta54_8Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_8, etiqueta54_8Data);
  return response.data;
};
