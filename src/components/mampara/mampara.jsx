import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";

const apiUrlEtiquetas = "http://localhost:3000/api/v1/etiquetas";
const apiUrlEtiquetasExt54_2 = "http://localhost:3000/api/v1/etiquetasExt54_2";

export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff");
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);
  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);
  const [etiquetasBussl, setEtiquetasBussl] = useState([]);
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [watchExt54ll, setWatch54ll] = useState(null);

  /*   const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(null); */

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
          </div>
        </div>
      </div>
    </div>
  );
}
