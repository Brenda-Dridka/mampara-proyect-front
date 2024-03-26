// api.js
import axios from "axios";

export const apiUrlEtiquetasExt40 =
  "https://mampara-backend.vercel.app/etiquetasExt40";

export const fetchEtiquetas40 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt40);
  return response.data;
};

export const createEtiqueta40 = async (etiqueta40Data) => {
  const response = await axios.post(apiUrlEtiquetasExt40, etiqueta40Data);
  return response.data;
};
