// api.js
import axios from "axios";

/* export const apiUrlEtiquetasExt54_2 =
  "https://mampara-backend.vercel.app/etiquetasExt54_2"; */

export const apiUrlEtiquetasExt70_2 =
  "https://mampara-backend.vercel.app/etiquetasExt70_2";

export const fetchEtiquetas70_2 = async () => {
  console.log("muestra data", data);
  const response = await axios.get(apiUrlEtiquetasExt70_2);
  return response.data;
};

export const createEtiqueta70_2 = async (etiqueta70_2Data) => {
  const response = await axios.post(apiUrlEtiquetasExt70_2, etiqueta70_2Data);
  return response.data;
};
