import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt40 } from "../../../../api/extrusores/apiExt40";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";
import Container from "@mui/material/Container";

import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";
import PermisoValidator from "../../../login/PermissionValidator";

const EtiquetaTable40 = ({ etiquetas40, setEtiquetas40 }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlEtiquetasExt40);
        setEtiquetas40(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas40]);

  // Función para manejar el cambio en la lista de etiquetas
  const handleEtiquetasChange = (newState) => {
    setEtiquetas40(newState); // Actualizar el estado con las etiquetas
    console.log("Etiquetas40 posicionadas:", newState);

    guardarEtiquetas(newState);
  };
  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas40.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetas40(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  // Función para realizar el guardado automático de las etiquetas
  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXT-40",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasExt40, etiquetasConExtrusor);
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
    const updatedEtiquetas = etiquetas40.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas40(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };
  //implementacion de edicin de etiqueta
  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetas40.find((etiqueta) => etiqueta.id === etiquetaId);
    setSelectedEtiqueta(selected);

    // Abrir el diálogo de edición
    setOpenDialog(true);
  };

  //opcion de producto extruido
  const handleExtrudeEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected2 = etiquetas40.find(
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
          <h6 className="text-center tittleEtiquetas">Ext 40</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ReactSortable
              group="groupName"
              animation={200}
              setList={handleEtiquetasChange}
              delayOnTouchStart={true}
              delay={2}
              list={etiquetas40}
              className="position"
            >
              {etiquetas40.map((item, index) => (
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
          <h6 className="text-center tittleEtiquetas">Ext 40</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className="position">
              {etiquetas40.map((item, index) => (
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

export default EtiquetaTable40;
