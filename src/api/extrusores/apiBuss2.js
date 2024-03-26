// api.js
import axios from "axios";

export const apiUrlBuss2 = "https://mampara-backend.vercel.app/etiquetasBussll";

export const fetchEtiquetasBuss2 = async () => {
  const response = await axios.get(apiUrlEtiquetasExtBuss2);
  return response.data;
};

export const createEtiquetaBuss2 = async (etiquetaBuss2Data) => {
  const response = await axios.post(apiUrlBuss2, etiquetaBuss2Data);
  return response.data;
};
