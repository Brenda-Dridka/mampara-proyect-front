import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlBuss2 } from "../../../../api/extrusores/apiBuss2";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";

import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";

const EtiquetaTableBuss2 = ({ etiquetasBuss2, setEtiquetasBuss2 }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);

  useEffect(() => {
    console.log("etiquetasBuss2", etiquetasBuss2);
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlBuss2);
        setEtiquetasBuss2(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API");
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetasBuss2]);

  const handleEtiquetasChange = (newState) => {
    setEtiquetasBuss2(newState);
    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetasBuss2.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetasBuss2(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXTBUSS-II",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlBuss2, etiquetasConExtrusor);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 2
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };
  const handleEstadoChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetasBuss2.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetasBuss2(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };
  //implementacion de edicin de etiqueta
  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetasBuss2.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);

    // Abrir el diálogo de edición
    setOpenDialog(true);
  };

  //opcion de producto extruido
  const handleExtrudeEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected2 = etiquetasBuss2.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta2(selected2);

    // Abrir el diálogo de extrusión
    setOpenDialog2(true);
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittleEtiquetas">Buss II</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetasBuss2}
          className="position"
        >
          {etiquetasBuss2.map((item, index) => (
            <div key={item.id} className="etiqueta" data-id={item.id}>
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div
                    className="card-body titulosTyle "
                    style={{ display: "flex", justifyContent: " space-around" }}
                  >
                    {item.nombre}

                    <div
                      className={`etiqueta2 ${
                        item.estado === "inactivo" ? "etiqueta-inactiva" : ""
                      }`}
                    >
                      <Opciones
                        onDeleteClick={() => handleDeleteEtiqueta(item.id)}
                        onEstadoChange={() => handleEstadoChange(item.id)}
                        onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                        onExtrudeClick={() => handleExtrudeEtiqueta(item.id)} // Agregar esta línea
                        id={item.id}
                      />
                    </div>
                  </div>
                </div>
                <div className="tamañoLetraClave">{item.clave}</div>
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

                  <p className="tamañoLetra">{item.kilos}kg</p>
                </div>
              </div>
            </div>
          ))}
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
            onDeleteEtiqueta={() => handleDeleteEtiqueta(selectedEtiqueta2.id)}
          />
        </ReactSortable>
      )}
    </div>
  );
};

export default EtiquetaTableBuss2;
