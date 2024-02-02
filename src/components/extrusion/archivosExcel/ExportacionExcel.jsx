import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";

const ExportToExcel = () => {
  const [data, setData] = useState([]);
  const [etiquetas54_2, setEtiquetas54_2] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
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
  const [etiquetasExt54_8, setEtiquetasExt54_8] = useState([]);

  useEffect(() => {
    /*   fetchData(); */
    fetchData54_2();
    fetchDataBuss1();
    fetchData70_2();
    fetchData54_4();
    fetchData54_5();
    fetchData54_1();
    fetchData58();
    fetchData40();
    fetchData54_3();
    fetchData54_7();
    fetchData70_1();
    fetchDataBuss2();
    fetchData26_1();
    fetchData26_2();
    fetchData54_6();
    fetchData70_3();
    fetchData54_8();
  }, []);

  /* const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetas"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  }; */

  const fetchData54_2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_2"
      );
      setEtiquetas54_2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchDataBuss1 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasBussl");
      setEtiquetasBussl(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData70_2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt70_2"
      );
      setEtiquetasExt70_2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_4 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_4"
      );
      setEtiquetasExt54_4(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_5 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_5"
      );
      setEtiquetasExt54_5(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_1"
      );
      setEtiquetasExt54_1(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData58 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasExt58");
      setEtiquetasExt58(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData40 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasExt40");
      setEtiquetasExt40(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_3 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_3"
      );
      setEtiquetasExt54_3(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_7 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_7"
      );
      setEtiquetasExt54_7(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData70_1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt70_1"
      );
      setEtiquetasExt70_1(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchDataBuss2 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasBussll");
      setEtiquetasBuss2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData26_1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt26_1"
      );
      setEtiquetasExt26_1(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData26_2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt26_2"
      );
      setEtiquetasExt26_2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_6 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_6"
      );
      setEtiquetasExt54_6(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData70_3 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt70_3"
      );
      setEtiquetasExt70_3(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData54_8 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/etiquetasExt54_8"
      );
      setEtiquetasExt54_8(response.data);
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
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_2 = etiquetas54_2.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExportBuss1 = etiquetasBussl.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport70_2 = etiquetasExt70_2.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_4 = etiquetasExt54_4.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_5 = etiquetasExt54_5.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_1 = etiquetasExt54_1.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport58 = etiquetasExt58.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport40 = etiquetasExt40.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_3 = etiquetasExt54_3.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_7 = etiquetasExt54_7.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport70_1 = etiquetasExt70_1.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExportBuss2 = etiquetasBuss2.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport26_1 = etiquetasExt26_1.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport26_2 = etiquetasExt26_2.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_6 = etiquetasExt54_6.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport70_3 = etiquetasExt70_3.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport54_8 = etiquetasExt54_8.map(
        ({
          createdAt,
          updatedAt,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          fecha: formatDate(fecha),
        })
      );

      // Combina ambos conjuntos de datos en una sola matriz
      const combinedData = [
        ...dataToExport,
        ...dataToExport54_2,
        ...dataToExportBuss1,
        ...dataToExport70_2,
        ...dataToExport54_4,
        ...dataToExport54_5,
        ...dataToExport54_1,
        ...dataToExport58,
        ...dataToExport40,
        ...dataToExport54_3,
        ...dataToExport54_7,
        ...dataToExport70_1,
        ...dataToExportBuss2,
        ...dataToExport26_1,
        ...dataToExport26_2,
        ...dataToExport54_6,
        ...dataToExport70_3,
        ...dataToExport54_8,
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
