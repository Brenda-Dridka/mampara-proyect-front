import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";

const apiUrlEtiquetasExt54_2 = "http://localhost:3000/api/v1/etiquetasExt54_2";
const apiUrlBuss1 = "http://localhost:3000/api/v1/etiquetasBussl";
const apiUrlEtiquetasExt70_2 = "http://localhost:3000/api/v1/etiquetasExt70_2";
const apiUrlEtiquetasExt54_4 = "http://localhost:3000/api/v1/etiquetasExt54_4";

export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff");
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);
  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetasExt54_4, setEtiquetasExt54_4] = useState([]);

  const [etiquetasExt54_5, setEtiquetasExt54_5] = useState([]);

  const [watchExt54ll, setWatch54ll] = useState(null);
  const [watchBuss1, setWaBuss1] = useState(null);
  const [watchExt70_2, setWatchExt70_2] = useState(null);
  const [watchExt54_4, setWatchExt54_4] = useState(null);

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
      .get("http://localhost:3000/api/v1/etiquetasExt54_4")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("No se pudieron cargar los etiquetasExt70_2.");
        }
        setEtiquetasExt54_4(response.data);
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

  /* implementacion de el guardado de etiquetas para cada extrusor */
  useEffect(() => {
    if (watchExt54ll !== null) {
      console.log("chek1 ", ext54lletiquetas);

      // Aquí manejas el guardado masivo al cambiar ext54lletiquetas
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_2, ext54lletiquetas);

          console.log("Etiquetas guardadas con éxito");
        } catch (error) {
          console.error("Error al guardar las etiquetas", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia ext54lletiquetas
      guardarEtiquetasMasivo();
    }
  }, [ext54lletiquetas]);

  const handleext54lletiquetasChange = (newState) => {
    setWatch54ll(new Date());
    setExt54lletiquetas(newState);
  };
  /* ------BUSS1 */
  useEffect(() => {
    if (watchBuss1 !== null) {
      console.log("chekBuss1 ", etiquetasBussl);

      // Aquí manejas el guardado masivo al cambiar etiquetasBussl
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlBuss1, etiquetasBussl);

          console.log("Etiquetas guardadas con éxito Buss 1");
        } catch (error) {
          console.error("Error al guardar las etiquetas Buss1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasBussl
      guardarEtiquetasMasivo();
    }
  }, [etiquetasBussl]);

  const handleBuss1etiquetasChange = (newState) => {
    setWaBuss1(new Date());
    setEtiquetasBussl(newState);
  };
  /* Ext 70-2 */
  useEffect(() => {
    if (watchExt70_2 !== null) {
      console.log("chekBussbuss1 ", etiquetasExt70_2);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt70_2
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt70_2, etiquetasExt70_2);

          console.log("Etiquetas guardadas con éxito Buss 1");
        } catch (error) {
          console.error("Error al guardar las etiquetas Buss1", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt70_2
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt70_2]);

  const handleEXT70IIetiquetasChange = (newState) => {
    setWatchExt70_2(new Date());
    setEtiquetasExt70_2(newState);
  };

  /* 54_4 */
  useEffect(() => {
    if (watchExt54_4 !== null) {
      console.log("chekBussbuss1 ", etiquetasExt54_4);

      // Aquí manejas el guardado masivo al cambiar etiquetasExt70_2
      const guardarEtiquetasMasivo = async () => {
        try {
          // Guarda las nuevas etiquetas

          await axios.post(apiUrlEtiquetasExt54_4, etiquetasExt54_4);

          console.log("Etiquetas guardadas con éxito 54-4");
        } catch (error) {
          console.error("Error al guardar las etiquetas 54-4", error);
        }
      };

      // Llama a la función de guardado masivo cuando cambia etiquetasExt54_4
      guardarEtiquetasMasivo();
    }
  }, [etiquetasExt54_4]);

  const handleEXT54_4etiquetasChange = (newState) => {
    setWatchExt54_4(new Date());
    setEtiquetasExt54_4(newState);
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
                  setList={(newState) => handleext54lletiquetasChange(newState)}
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
                  setList={(newState) => handleBuss1etiquetasChange(newState)}
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
                  setList={(newState) => handleEXT70IIetiquetasChange(newState)}
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
            <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-IV</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-IV"
                  list={etiquetasExt54_4}
                  setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_4.map((item) => (
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
            {/* ---------------------------------------------------------------------------------------- */}
            {/*  <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-V</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-V"
                  list={etiquetasExt54_5}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_5.map((item) => (
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
            </div> */}
            {/*   <div className="col bg-danger position">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6 className="text-center tittle">EXT54-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-I"
                  list={etiquetasExt54_1}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_1.map((item) => (
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
                <h6 className="text-center tittle">EXT58</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT58"
                  list={etiquetasExt58}
                  // setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt58.map((item) => (
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
                <h6 className="text-center tittle">EXT40</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT40"
                  list={etiquetasExt40}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt40.map((item) => (
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
                <h6 className="text-center tittle">EXT54-III</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-III"
                  list={etiquetasExt54_3}
                  // setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_3.map((item) => (
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
                <h6 className="text-center tittle">EXT54-VII</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VII"
                  list={etiquetasExt54_7}
                  // setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_7.map((item) => (
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
                <h6 className="text-center tittle">EXT70-I</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-I"
                  list={etiquetasExt70_1}
                  // setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_1.map((item) => (
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
                <h6 className="text-center tittle">BUSS II</h6>
              </div>
              <div>
                <ReactSortable
                  value="BUSS II"
                  list={etiquetasBuss2}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasBuss2.map((item) => (
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
                <h6 className="text-center tittle">EXT26-1</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT26-1"
                  list={etiquetasExt26_1}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt26_1.map((item) => (
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
                <h6 className="text-center tittle">EXT26-2</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT26-2"
                  list={etiquetasExt26_2}
                  setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt26_2.map((item) => (
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
                <h6 className="text-center tittle">EXT54-VI</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VI"
                  list={etiquetasExt54_6}
                  setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_6.map((item) => (
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
                <h6 className="text-center tittle">EXT70-III</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT70-III"
                  list={etiquetasExt70_3}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt70_3.map((item) => (
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
                <h6 className="text-center tittle">EXT54-VIII</h6>
              </div>
              <div>
                <ReactSortable
                  value="EXT54-VIII"
                  list={etiquetasExt54_8}
                  //setList={(newState) => handleEXT54_4etiquetasChange(newState)}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasExt54_8.map((item) => (
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
            </div> */}

            {/* ---------------------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}
