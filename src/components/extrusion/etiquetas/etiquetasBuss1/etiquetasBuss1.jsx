import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlBuss1 } from "../../../../api/extrusores/apiBuss1";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../etiquetasAgregadas/opciones/option";

const EtiquetaTableBuss1 = ({ etiquetasBuss1, setEtiquetasBuss1 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlBuss1);
        setEtiquetasBuss1(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetasBuss1]);

  // Función para manejar el cambio en la lista de etiquetas
  const handleEtiquetasChange = (newState) => {
    setEtiquetasBuss1(newState); // Actualizar el estado con las etiquetas
    console.log("Etiquetas Buss 1 Agregadas posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetasBuss1.filter(
      (etiquetasBuss1) => etiquetasBuss1.id !== etiquetaId
    );
    setEtiquetasBuss1(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXTBUSS-I",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlBuss1, etiquetasConExtrusor);
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
    const updatedEtiquetas = etiquetasBuss1.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetasBuss1(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };
  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Buss I</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetasBuss1}
          className="position"
        >
          {etiquetasBuss1.map((item, index) => (
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
    </div>
  );
};

export default EtiquetaTableBuss1;
