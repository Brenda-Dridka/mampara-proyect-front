// api.js
import axios from "axios";

export const apiUrlEtiquetasExt58 =
  "https://mampara-backend.vercel.app/etiquetasExt58";

export const fetchEtiquetas58 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt58);
  return response.data;
};

export const createEtiqueta58 = async (etiqueta58Data) => {
  const response = await axios.post(apiUrlEtiquetasExt58, etiqueta58Data);
  return response.data;
};
