import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt26_1 } from "../../../../api/extrusores/apiExt26_1";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";

import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";

const EtiquetaTable26_1 = ({ etiquetas26_1, setEtiquetas26_1 }) => {
  const [loading, setLoading] = useState(true);

  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlEtiquetasExt26_1);
        setEtiquetas26_1(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas26_1]);

  // Función para manejar el cambio en la lista de etiquetas
  const handleEtiquetasChange = (newState) => {
    setEtiquetas26_1(newState); // Actualizar el estado con las etiquetas
    console.log("Etiquetas26_1 posicionadas:", newState);

    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas26_1.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetas26_1(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  // Función para realizar el guardado automático de las etiquetas
  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXT-26-I",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasExt26_1, etiquetasConExtrusor);
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
    const updatedEtiquetas = etiquetas26_1.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas26_1(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  //editar etiqueta
  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetas26_1.find(
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
      const selected2 = etiquetas26_1.find(
        (etiqueta) => etiqueta.id === etiquetaId
      );
      setSelectedEtiqueta2(selected2);

      // Abrir el diálogo de extrusión
      setOpenDialog2(true);

      // Filtrar etiquetas26_1 eliminando la etiqueta
      const updatedEtiquetas26_1 = etiquetas26_1.filter(
        (item) => item.id !== etiquetaId
      );
      setEtiquetas26_1(updatedEtiquetas26_1);

      // Guardar las etiquetas actualizadas en la API
      await axios.post(apiUrlEtiquetasExt26_1, updatedEtiquetas26_1);
      console.log("Etiqueta extruida y guardada con éxito");
    } catch (error) {
      console.error("Error al extruir la etiqueta", error);
    }
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Ext 26 I</h6>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetas26_1}
          className="position"
        >
          {etiquetas26_1.map((item, index) => (
            <div
              key={item.id}
              className={`etiqueta ${
                item.estado === "inactivo" ? "etiqueta-inactiva" : ""
              }`}
              data-id={item.id}
            >
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div className="card-body titulosTyle ">
                    {item.nombre} - Posición: {index + 1}
                  </div>
                  <div>
                    <Opciones
                      onDeleteClick={() => handleDeleteEtiqueta(item.id)}
                      onEstadoChange={() => handleEstadoChange(item.id)}
                      onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                      onExtrudeClick={() => handleExtrudeEtiqueta(item.id)}
                    />
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

export default EtiquetaTable26_1;
