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
  const [etiquetasPorExtrusor, setEtiquetasPorExtrusor] = useState({});
  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null);

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/etiquetas")
      .then((response) => {
        if (response.status !== 200) {
          throw Error("No se pudieron cargar las etiquetas.");
        }
        setEtiquetasAgregadas(response.data);
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

  useEffect(() => {
    console.log(ext54lletiquetas);
    axios
      .post("http://localhost:3000/api/v1/etiquetasExt54_2", {
        data: ext54lletiquetas,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw Error("No se pudieron cargar las etiquetas.");
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar etiquetas:", error);
      });
  }, [ext54lletiquetas]);

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
        </div>
      </div>
    </div>
  );
} /* 
 como puedo implementar que las etiquetas que se encuentran en la seccion de Etiquetas Agregadas, al cambiarlas de pocicion de alguno de los secciones de los extrusores, ext54-ll, buss-1, ext70-ll, dependiendo a donde se cambiara la etiqueta, al precionar un boton guarde en la base de datos en la tabla de etiquetaext70_2, etiquetasext54_2. etiquetabussl, dependiendo en que seccion es agregada cada etiqueta, si es type=EXT54-II guardarlo en la api "http://localhost:3000/api/v1/etiquetasExt54_2", si es type=BUSS-I, guardarla en la api= http://localhost:3000/api/v1/etiquetasBussl,  type=EXT70-II en la api http://localhost:3000/api/v1/etiquetasExt70_2, una vez almacenado en la tabla asignada, se eliminara de la tabla etiquetas, guardandolo en la seccion seleccionada
  */
