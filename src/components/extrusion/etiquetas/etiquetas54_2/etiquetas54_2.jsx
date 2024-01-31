import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_2 } from "../../../../api/apiExt54_2";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";

import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";

const EtiquetaTable54_2 = ({ etiquetas54_2, setEtiquetas54_2 }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlEtiquetasExt54_2);
        setEtiquetas54_2(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas54_2]);

  const handleEtiquetasChange = (newState) => {
    setEtiquetas54_2(newState);
    console.log("Etiquetas54_2 posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas54_2.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetas54_2(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  // Función para realizar el guardado automático de las etiquetas
  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXT54-II",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasExt54_2, etiquetasConExtrusor);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  const handleEstadoChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas54_2.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas54_2(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  //implementacion de edicin de etiqueta
  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetas54_2.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);

    // Abrir el diálogo de edición
    setOpenDialog(true);
  };

  //opcion de producto extruido
  const handleExtrudeEtiqueta = async (etiquetaId) => {
    try {
      // Buscar la etiqueta seleccionada
      const selected2 = etiquetas54_2.find(
        (etiqueta) => etiqueta.id === etiquetaId
      );
      setSelectedEtiqueta2(selected2);

      // Abrir el diálogo de extrusión
      setOpenDialog2(true);

      // Filtrar etiquetas54_2 eliminando la etiqueta
      const updatedEtiquetas54_2 = etiquetas54_2.filter(
        (item) => item.id !== etiquetaId
      );
      setEtiquetas54_2(updatedEtiquetas54_2);

      // Guardar las etiquetas actualizadas en la API
      await axios.post(apiUrlEtiquetasExt54_2, updatedEtiquetas54_2);
      console.log("Etiqueta extruida y guardada con éxito");
    } catch (error) {
      console.error("Error al extruir la etiqueta", error);
    }
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Etiquetas 54_2</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          value="EXT54-II"
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetas54_2}
          className="position"
        >
          {etiquetas54_2.map((item, index) => (
            <div
              key={item.id}
              className={`etiqueta ${
                item.estado === "inactivo" ? "etiqueta-inactiva" : ""
              }`}
              data-id={item.id}
            >
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div
                    className="card-body titulosTyle "
                    style={{ display: "flex", justifyContent: " space-around" }}
                  >
                    {item.nombre} - Posición: {index + 1}
                    <div>
                      <Opciones
                        onDeleteClick={() => handleDeleteEtiqueta(item.id)}
                        onEstadoChange={() => handleEstadoChange(item.id)}
                        onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                        onExtrudeClick={() => handleExtrudeEtiqueta(item.id)} // Agregar esta línea
                      />
                    </div>
                  </div>
                </div>
                <hr className="linea-etiqueta" />
                <strong>
                  {item.polvos === true && (
                    <p className="tamañoLetra posicionamientoEtiquetas spaciadoEtiquetaLetras">
                      POLVOS
                    </p>
                  )}
                </strong>
                <hr className="linea-etiqueta" />
                <div className="position2 spaciadoEtiquetaLetras">
                  <p className="tamañoLetra ">
                    {" "}
                    {formatDateWithoutTime(item.fecha)}
                  </p>
                  <p className="tamañoLetra">{item.clave}</p>
                  <p className="tamañoLetra">{item.kilos}kg</p>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      )}
      <EditFormDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEtiqueta(null);
        }}
        etiqueta={selectedEtiqueta}
      />
      <ExtrusionFormDialog
        open={openDialog2}
        onClose={() => {
          setOpenDialog2(false);
          setSelectedEtiqueta2(null);
        }}
        etiqueta={selectedEtiqueta2}
      />
    </div>
  );
};

export default EtiquetaTable54_2;
