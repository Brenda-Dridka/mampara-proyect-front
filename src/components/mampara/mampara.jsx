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
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);

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
      .get("http://localhost:3000/api/v1/etiquetasBussl")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasBussl.");
        }
        setEtiquetasBussl(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasBussl:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetasExt70_2")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt70_2.");
        }
        setEtiquetasExt70_2(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetasExt70_2:", error);
      });
  }, []);

  const guardarCambiosEtiqueta = async (etiqueta, tipoExtrusor) => {
    try {
      let apiUrl = "http://localhost:3000/api/v1/etiquetas";
      if (tipoExtrusor === "EXT54-II") {
        apiUrl = "http://localhost:3000/api/v1/etiquetasExt54_2";
      } else if (tipoExtrusor === "BUSS-I") {
        apiUrl = "http://localhost:3000/api/v1/etiquetasBussl";
      } else if (tipoExtrusor === "EXT70-II") {
        apiUrl = "http://localhost:3000/api/v1/etiquetasExt70_2";
      } else {
        console.error("Tipo de extrusor no reconocido");
        return;
      }

      await axios.put(`${apiUrl}/${etiqueta.id}`, {
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

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  const guardarCambiosEtiquetaSeleccionada = async () => {
    if (etiquetaSeleccionada) {
      const tipoExtrusor = etiquetasPorExtrusor[etiquetaSeleccionada.extrusor];
      await guardarCambiosEtiqueta(etiquetaSeleccionada, tipoExtrusor);
    } else {
      console.error("No hay etiqueta seleccionada para guardar cambios");
    }
  };

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
            <button onClick={{}}></button>
          </div>

          <div className="fondo">
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-II</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-II"
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">BUSS-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="BUSS-I"
                  list={etiquetasBussl}
                  setList={setEtiquetasBussl}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasBussl.map((item) => (
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT70-II</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-II"
                  list={etiquetasExt70_2}
                  setList={setEtiquetasExt70_2}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_2.map((item) => (
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
          </div>
          <button onClick={guardarCambiosEtiquetaSeleccionada}>
            Guardar Cambios Etiqueta Seleccionada
          </button>
        </div>
      </div>
    </div>
  );
} /* 
como implementar que las etiquetas quue se encuentran en la seccion Agregadas, al cambiarlas de pocicion de alguno de los extrusores al precionar un boton guarde en la base de datos en la tabla de etiquetaext70_2, etiquetasext54_2. etiquetabussl, dependiendo el tipa, si es type=EXT54-II guardarlo en la api "http://localhost:3000/api/v1/etiquetasExt54_2", si es type=BUSS-I, guardarla en la api= http://localhost:3000/api/v1/etiquetasBussl,  type=EXT70-II en la api http://localhost:3000/api/v1/etiquetasExt70_2
 */
