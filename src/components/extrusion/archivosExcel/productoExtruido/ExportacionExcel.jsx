import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";
import generalData from "../../../../api/fechas"; // Importa los datos generales

const ExportToExcel = () => {
  const [productoExtruido, setProductoExtruido] = useState([]);
  useEffect(() => {
    fetchDataProductoExtruido();
  }, []);

  const fetchDataProductoExtruido = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/productos-extruidos"
      );
      setProductoExtruido(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const generateFechaClave = (fechaReal, generalData) => {
    const fechaClave = generalData.find(
      (fecha) => formatDate(fecha.fecha_real) === formatDate(fechaReal)
    );

    return fechaClave ? `${fechaClave.general}` : "";
  };

  const exportToExcel = () => {
    try {
      const dataToExportProductoExtruido = productoExtruido.map(
        ({ createdAt, updatedAt, clave, ...rest }) => ({
          ...rest,
          //fechaClave: generateFechaClave(createdAt, generalData),
          claveUnica: `${generateFechaClave(createdAt, generalData)}${clave}`,
        })
      );

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExportProductoExtruido);
      XLSX.utils.book_append_sheet(workbook, worksheet, "productos_Extruidos");

      XLSX.writeFile(workbook, "productos_estruidos.xlsx");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };

  return (
    <div>
      <Button
        startIcon={<FaFileExcel />}
        variant="contained"
        onClick={exportToExcel}
        color="success"
      >
        Exportar a Excel
      </Button>
    </div>
  );
};

export default ExportToExcel;
