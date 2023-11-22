import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";

export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff");
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);
  const [extrusores, setExtrusores] = useState([]);
  const [etiquetasPorExtrusor, setEtiquetasPorExtrusor] = useState({});
  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/extrusores")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los extrusores.");
        }
        setExtrusores(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar extrusores:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt54_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt54ll.");
        }
        setExt54lletiquetas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt54ll:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetas")
      .then((response) => {
        if (response.status !== 200) {
          throw Error("No se pudieron cargar las etiquetas.");
        }
        const etiquetas = response.data;
        setEtiquetasAgregadas(etiquetas);

        // Recuperar información sobre el extrusor de localStorage
        const extrusorInfo =
          JSON.parse(localStorage.getItem("extrusorInfo")) || {};
        const etiquetasPorExtrusorTemp = {};

        etiquetas.forEach((etiqueta) => {
          const extrusorId = extrusorInfo[etiqueta.id];
          if (extrusorId) {
            etiquetasPorExtrusorTemp[extrusorId] =
              etiquetasPorExtrusorTemp[extrusorId] || [];
            etiquetasPorExtrusorTemp[extrusorId].push(etiqueta);
          }
        });

        setEtiquetasPorExtrusor(etiquetasPorExtrusorTemp);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetas:", error);
      });
  }, []);

  const handleTagDelete = (tagId) => {
    setEtiquetasAgregadas(
      etiquetasAgregadas.filter((item) => item.id !== tagId)
    );
  };

  const guardarCambiosEtiqueta = async (etiqueta) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`, {
        extrusor: etiqueta.extrusor,
      });

      console.log(
        `Cambios guardados en el campo 'extrusor' de la etiqueta ${etiqueta.id}`
      );
    } catch (error) {
      console.error(
        `Error al guardar cambios en la etiqueta ${etiqueta.id}:`,
        error
      );
    }
  };

  const guardarCambiosEtiquetasExtrusor = async (extrusorId) => {
    const etiquetasEnExtrusor = etiquetasPorExtrusor[extrusorId] || [];

    const promises = etiquetasEnExtrusor.map((etiqueta) => {
      return guardarCambiosEtiqueta({
        ...etiqueta,
        extrusor: extrusores.find((e) => e.id === extrusorId)?.nombre,
      });
    });

    try {
      await Promise.all(promises);
      console.log(
        `Cambios guardados en todas las etiquetas del extrusor ${extrusorId}.`
      );
    } catch (error) {
      console.error(
        `Error al guardar cambios en etiquetas del extrusor ${extrusorId}:`,
        error
      );
    }
  };

  const handleTagDrop = async (tagId, extrusor) => {
    try {
      const extrusorExistente = extrusores.find((e) => e.nombre === extrusor);

      if (extrusorExistente) {
        const etiqueta = etiquetasAgregadas.find((item) => item.id === tagId);

        if (etiqueta.extrusor === extrusorExistente.nombre) {
          console.log(
            `La etiqueta ${tagId} ya está asignada al extrusor ${extrusor}`
          );
          return;
        }

        await axios.put(`http://localhost:3000/api/v1/etiquetas/${tagId}`, {
          extrusor: extrusorExistente.nombre,
        });

        console.log(
          `Etiqueta ${tagId} asignada al extrusor ${extrusorExistente.nombre}`
        );

        const updatedEtiquetas = etiquetasAgregadas.map((item) => {
          if (item.id === tagId) {
            return { ...item, extrusor: extrusorExistente.nombre };
          }
          return item;
        });

        setEtiquetasAgregadas(updatedEtiquetas);

        setEtiquetasPorExtrusor((prevEtiquetasPorExtrusor) => {
          const newEtiquetas =
            prevEtiquetasPorExtrusor[extrusorExistente.id] || [];
          newEtiquetas.push(
            etiquetasAgregadas.find((item) => item.id === tagId)
          );
          return {
            ...prevEtiquetasPorExtrusor,
            [extrusorExistente.id]: newEtiquetas,
          };
        });

        // Almacenar información sobre el extrusor en localStorage
        const extrusorInfo =
          JSON.parse(localStorage.getItem("extrusorInfo")) || {};
        extrusorInfo[tagId] = extrusorExistente.id;
        localStorage.setItem("extrusorInfo", JSON.stringify(extrusorInfo));

        await guardarCambiosEtiquetasExtrusor(extrusorExistente.id);
      } else {
        console.error(
          `El nombre del extrusor no coincide con ninguno de los extrusores disponibles.`
        );
      }
    } catch (error) {
      console.error(`Error al asignar la etiqueta al extrusor:`, error);
    }
  };

  function formatDateWithoutTime(date) {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
      <AgregarProducto />
      <div className="container">
        <div className="row align-items-start">
          <div className="col bg-success">
            <div className="position etiquetasAgregadas">
              <h6 className="text-center tittle">Etiquetas Agregadas</h6>
              <ReactSortable
                list={etiquetasAgregadas}
                setList={setEtiquetasAgregadas}
                group="shared-group-name"
                className="position"
              >
                {etiquetasAgregadas.map((item) => (
                  <div
                    key={item.id}
                    className="etiqueta"
                    style={{
                      backgroundColor:
                        item.estado === "pendiente" ? "#FFE224" : labelColor,
                    }}
                    data-id={item.id}
                  >
                    {/* Contenido de la etiqueta, similar al resto del código */}
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                        <div className="card-body titulosTyle ">
                          {item.nombre}
                        </div>
                        <BotonOption
                          etiqueta={item}
                          onDelete={handleTagDelete}
                        />
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
            </div>
          </div>
          <div className="fondo">
            {extrusores.map((extrusor) => (
              <div key={extrusor.id} className="col bg-danger position">
                <h6 className="text-center tittle">{extrusor.nombre}</h6>
                <ReactSortable
                  list={etiquetasPorExtrusor[extrusor.id] || []}
                  setList={(newEtiquetas) => {
                    setEtiquetasPorExtrusor((prevEtiquetas) => ({
                      ...prevEtiquetas,
                      [extrusor.id]: newEtiquetas,
                    }));
                  }}
                  group="shared-group-name"
                  className="position"
                  data-extrusorid={extrusor.id}
                  onEnd={(evt) => {
                    const extrusorId =
                      evt.newSet.nextSibling.dataset.extrusorid;
                    const tagId = evt.item.dataset.id;
                    handleTagDrop(tagId, extrusorId);
                  }}
                >
                  {etiquetasPorExtrusor[extrusor.id]
                    ? etiquetasPorExtrusor[extrusor.id].map((item) => (
                        <div
                          key={item.id}
                          className="etiqueta"
                          style={{
                            backgroundColor:
                              item.estado === "pendiente"
                                ? "#FFE224"
                                : labelColor,
                          }}
                        >
                          <div className="m-3 cursor-draggable">
                            <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                              <div className="card-body titulosTyle ">
                                {item.nombre}
                              </div>
                              <BotonOption
                                etiqueta={item}
                                onDelete={handleTagDelete}
                              />
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
                      ))
                    : null}
                </ReactSortable>
                <button
                  onClick={() => guardarCambiosEtiquetasExtrusor(extrusor.id)}
                >
                  Guardar Cambios
                </button>
              </div>
            ))}
          </div>
          <div>
            {/* mampara de extrusor etiqueta */}
            <h6 className="text-center tittle">Ext 54 ll</h6>
            <ReactSortable
              list={ext54lletiquetas}
              setList={setExt54lletiquetas}
              group="shared-group-name"
              className="position"
            >
              {ext54lletiquetas.map((item) => (
                <div
                  key={item.id}
                  className="etiqueta"
                  style={{
                    backgroundColor:
                      item.estado === "pendiente" ? "#FFE224" : labelColor,
                  }}
                  data-id={item.id}
                >
                  <div className="m-3 cursor-draggable">
                    <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                      <div className="card-body titulosTyle ">
                        {item.nombre}
                      </div>
                      <BotonOption etiqueta={item} onDelete={handleTagDelete} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
