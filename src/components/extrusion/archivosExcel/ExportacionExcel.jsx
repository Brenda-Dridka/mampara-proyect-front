import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";

const ExportToExcel = () => {
  const [data, setData] = useState([]);
  const [etiquetas54_2, setEtiquetas54_2] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  /*   const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetasExt54_4, setEtiquetasExt54_4] = useState([]);
  const [etiquetasExt54_5, setEtiquetasExt54_5] = useState([]);
  const [etiquetasExt54_1, setEtiquetasExt54_1] = useState([]);
  const [etiquetasExt58, setEtiquetasExt58] = useState([]);
  const [etiquetasExt40, setEtiquetasExt40] = useState([]);
  const [etiquetasExt54_3, setEtiquetasExt54_3] = useState([]);
  const [etiquetasExt54_7, setEtiquetasExt54_7] = useState([]);
  const [etiquetasExt70_1, setEtiquetasExt70_1] = useState([]);
  const [etiquetasBuss2, setEtiquetasBuss2] = useState([]);
  const [etiquetasExt26_1, setEtiquetasExt26_1] = useState([]);
  const [etiquetasExt26_2, setEtiquetasExt26_2] = useState([]);
  const [etiquetasExt54_6, setEtiquetasExt54_6] = useState([]);
  const [etiquetasExt70_3, setEtiquetasExt70_3] = useState([]);
  const [etiquetasExt54_8, setEtiquetasExt54_8] = useState([]); */

  useEffect(() => {
    fetchData();
    fetchData54_2();
    fetchDataBuss1();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mampara-backend.vercel.app/etiquetas"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const fetchData54_2 = async () => {
    try {
      const response = await axios.get(
        "https://mampara-backend.vercel.app/etiquetasExt54_2"
      );
      setEtiquetas54_2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchDataBuss1 = async () => {
    try {
      const response = await axios.get(
        "https://mampara-backend.vercel.app/etiquetasBussl"
      );
      setEtiquetasBussl(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const exportToExcel = () => {
    try {
      // Excluye las columnas createdAt y updatedAt y ajusta el formato de la fecha
      const dataToExport = data.map(
        ({ createdAt, updatedAt, fecha, ...rest }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_2 = etiquetas54_2.map(
        ({ createdAt, updatedAt, fecha, ...rest }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExportBuss1 = etiquetasBussl.map(
        ({ createdAt, updatedAt, fecha, ...rest }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );

      // Combina ambos conjuntos de datos en una sola matriz
      const combinedData = [
        ...dataToExport,
        ...dataToExport54_2,
        ...dataToExportBuss1,
      ];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(combinedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "mampara");

      XLSX.writeFile(workbook, "mampara.xlsx");
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
