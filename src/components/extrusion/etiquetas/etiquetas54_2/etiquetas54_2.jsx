import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import Container from "@mui/material/Container";

import "../../../../style/etiquetas.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_2 } from "../../../../api/apiExt54_2";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";

import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";

const EtiquetaTable54_2 = ({
  etiquetas54_2,
  setEtiquetas54_2,
  verificarDuplicados,
}) => {
  const duplicados = verificarDuplicados(etiquetas54_2);
  const isDuplicado = (nombre) => {
    return verificarDuplicados.includes(nombre);
  };

  const [editedKilosGreater, setEditedKilosGreater] = useState(
    localStorage.getItem("editedKilosGreater") === "true" || false
  );
  const updateEditedKilosGreater = (value) => {
    setEditedKilosGreater(value);
    localStorage.setItem("editedKilosGreater", value.toString());
  };

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
    const selected = etiquetas54_2.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);
    setOpenDialog(true);
  };

  //opcion de producto extruido
  const handleExtrudeEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected2 = etiquetas54_2.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta2(selected2);

    // Abrir el diálogo de extrusión
    setOpenDialog2(true);
  };
  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittleEtiquetas">54 II</h6>
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
                duplicados.has(item.nombre) ? "etiqueta-duplicada" : ""
              }`}
              data-id={item.id}
            >
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div
                    className="card-body titulosTyle "
                    style={{
                      display: "flex",
                      justifyContent: " space-around",
                    }}
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
                <div
                  className="position2 spaciadoEtiquetaLetras"
                  style={{ display: "flex", margin: "0px", padding: "0px" }}
                >
                  <Container
                    style={{
                      margin: "0px",
                      padding: "0.5px",
                    }}
                  >
                    <p className="interlineadoP">Fecha de Orden</p>
                    <p className="tamañoLetra fechasOrdenes">
                      {/* fecha de orden */}
                      {formatDateWithoutTime(item.fecha_entrega)}
                    </p>

                    <p className="interlineadoP">Fecha de Entrega</p>
                    <p className="tamañoLetra fechasOrdenes">
                      {formatDateWithoutTime(item.fecha)}
                    </p>
                  </Container>
                  <Container
                    style={{ width: "40%", margin: "0px", padding: "0.5px" }}
                  >
                    <div
                      style={{
                        background: editedKilosGreater ? "lightgreen" : "",
                      }}
                    >
                      <p>Kilos</p>
                      <p
                        className="tamañoLetra interlineadoP"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.kilos}kg
                      </p>
                    </div>
                  </Container>
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
        editedKilosGreater={editedKilosGreater} // Pasar el estado como prop
        onDeleteEtiqueta={() => handleDeleteEtiqueta(selectedEtiqueta.id)}
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
    </div>
  );
};

export default EtiquetaTable54_2;
