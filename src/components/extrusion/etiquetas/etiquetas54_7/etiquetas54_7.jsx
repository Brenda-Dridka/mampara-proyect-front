import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_7 } from "../../../../api/extrusores/apiExt54_7";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";
import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";
import Container from "@mui/material/Container";

import PermisoValidator from "../../../login/PermissionValidator";

const EtiquetaTable54_7 = ({ etiquetas54_7, setEtiquetas54_7 }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlEtiquetasExt54_7);
        setEtiquetas54_7(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas54_7]);

  // Función para manejar el cambio en la lista de etiquetas
  const handleEtiquetasChange = (newState) => {
    setEtiquetas54_7(newState); // Actualizar el estado con las etiquetas
    console.log("Etiquetas54_7 posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas54_7.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetas54_7(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  // Función para realizar el guardado automático de las etiquetas
  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXT54-VII",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasExt54_7, etiquetasConExtrusor);
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
    const updatedEtiquetas = etiquetas54_7.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas54_7(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetas54_7.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);

    // Abrir el diálogo de edición
    setOpenDialog(true);
  };
  const handleExtrudeEtiqueta = async (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected2 = etiquetas54_7.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta2(selected2);

    // Abrir el diálogo de extrusión
    setOpenDialog2(true);
  };
  return (
    <>
      <PermisoValidator permiso="extrusores.mover">
        <div className="position etiquetasAgregadas">
          <h6 className="text-center tittleEtiquetas">54 VII</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ReactSortable
              group="groupName"
              animation={200}
              setList={handleEtiquetasChange}
              delayOnTouchStart={true}
              delay={2}
              list={etiquetas54_7}
              className="position"
            >
              {etiquetas54_7.map((item, index) => (
                <div key={item.id} className="etiqueta" data-id={item.id}>
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
                            item.estado === "inactivo"
                              ? "etiqueta-inactiva"
                              : ""
                          }`}
                        >
                          <Opciones
                            onDeleteClick={() => handleDeleteEtiqueta(item.id)}
                            onEstadoChange={() => handleEstadoChange(item.id)}
                            onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                            onExtrudeClick={() =>
                              handleExtrudeEtiqueta(item.id)
                            } // Agregar esta línea
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
                        style={{
                          width: "40%",
                          margin: "0px",
                          padding: "0.5px",
                        }}
                      >
                        <p>Kilos</p>
                        <p
                          className="tamañoLetra interlineadoP"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.kilos}kg
                        </p>
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
      </PermisoValidator>
      <PermisoValidator permiso="extrusores.no_mover">
        <div className="position etiquetasAgregadas">
          <h6 className="text-center tittleEtiquetas">54 VII</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className="position">
              {etiquetas54_7.map((item, index) => (
                <div key={item.id} className="etiqueta" data-id={item.id}>
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
                            item.estado === "inactivo"
                              ? "etiqueta-inactiva"
                              : ""
                          }`}
                        >
                          <PermisoValidator permiso="extrusores.mostrarOpciones">
                            <Opciones
                              onDeleteClick={() =>
                                handleDeleteEtiqueta(item.id)
                              }
                              onEstadoChange={() => handleEstadoChange(item.id)}
                              onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                              onExtrudeClick={() =>
                                handleExtrudeEtiqueta(item.id)
                              } // Agregar esta línea
                              id={item.id}
                            />
                          </PermisoValidator>
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
                        style={{
                          width: "40%",
                          margin: "0px",
                          padding: "0.5px",
                        }}
                      >
                        <p>Kilos</p>
                        <p
                          className="tamañoLetra interlineadoP"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.kilos}kg
                        </p>
                      </Container>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            onDeleteEtiqueta={() => handleDeleteEtiqueta(selectedEtiqueta2.id)}
          />
        </div>
      </PermisoValidator>
    </>
  );
};

export default EtiquetaTable54_7;
