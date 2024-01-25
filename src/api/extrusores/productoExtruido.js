import axios from "axios";

export const apiUrlProductosExtruidos =
  "https://mampara-backend.vercel.app/productos-extruidos";

export const fetchProductoExtruidos = async () => {
  const response = await axios.get(apiUrlProductosExtruidos);
  return response.data;
};

export const createProductosExtruidos = async (productosExtruidosData) => {
  const response = await axios.post(
    apiUrlProductosExtruidos,
    productosExtruidosData
  );
  return response.data;
};
