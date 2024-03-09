import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl } from "../../../../api/apiEtiquetas";
import Opciones from "./opciones/option";
import Container from "@mui/material/Container";

const EtiquetaTable = ({ etiquetas, setEtiquetas }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrl); // Reemplaza apiUrl con tu URL real
        setEtiquetas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas]);

  const handleEtiquetasChange = (newState) => {
    setEtiquetas(newState); // Actualizar el estado con las etiquetas
    console.log("Etiquetas Agregadas posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas.filter(
      (etiqueta) => etiqueta.id !== etiquetaId
    );
    setEtiquetas(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Realizar el guardado de las etiquetas
      await axios.post(apiUrl, etiquetas); // Reemplaza apiUrl con tu URL real
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
    const updatedEtiquetas = etiquetas.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  return (
    <>
      <div className="position etiquetasAgregadas">
        <h6 className="text-center tittle">Etiquetas Agregadas</h6>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <ReactSortable
            group="groupName"
            animation={200}
            setList={handleEtiquetasChange}
            delayOnTouchStart={true}
            delay={2}
            list={etiquetas}
            className="position"
          >
            {etiquetas.map((item) => (
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
                          /* onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                        onExtrudeClick={() => handleExtrudeEtiqueta(item.id)} // Agregar esta línea
                        id={item.id} */
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
                  <Container
                    className="position2 spaciadoEtiquetaLetras"
                    style={{ display: "flex" }}
                  >
                    <Container>
                      <p className="interlineadoP">Fecha de Orden</p>
                      <p className="tamañoLetra fechasOrdenes">
                        {formatDateWithoutTime(item.fecha)}
                      </p>

                      <p className="interlineadoP">Fecha de Entrega</p>
                      <p className="tamañoLetra fechasOrdenes">
                        {item.fecha_entrega}
                      </p>
                    </Container>
                    <Container style={{ width: "40%" }}>
                      <p>Kilos</p>
                      <p
                        className="tamañoLetra interlineadoP"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.kilos}kg
                      </p>
                    </Container>
                  </Container>
                </div>
              </div>
            ))}
          </ReactSortable>
        )}
      </div>
    </>
  );
};

export default EtiquetaTable;
