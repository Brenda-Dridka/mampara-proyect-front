// api.js
import axios from "axios";

export const apiUrlBuss2 =
  "https://mampara-backend-nu.vercel.app/etiquetasBussll";

export const fetchEtiquetasBuss2 = async () => {
  console.log("muestra data", data);
  const response = await axios.get(apiUrlEtiquetasExtBuss2);
  return response.data;
};

export const createEtiquetaBuss2 = async (etiquetaBuss2Data) => {
  const response = await axios.post(apiUrlBuss2, etiquetaBuss2Data);
  return response.data;
};
