// api.js
import axios from "axios";

export const apiUrlEtiquetasExt26_2 =
  "https://mampara-backend-nu.vercel.app/etiquetasExt26_2";

export const fetchEtiquetas26_2 = async () => {
  console.log("muestra data", data);
  const response = await axios.get(apiUrlEtiquetasExt26_2);
  return response.data;
};

export const createEtiqueta26_2 = async (etiqueta26_2Data) => {
  const response = await axios.post(apiUrlEtiquetasExt26_2, etiqueta26_2Data);
  return response.data;
};
