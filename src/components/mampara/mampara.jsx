import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";

//implementacion extrusores etiquetas
export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff");
  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);
  const [extrusores, setExtrusores] = useState([]);
  const [etiquetasPorExtrusor, setEtiquetasPorExtrusor] = useState({});

  useEffect(() => {
    // Cargar extrusores desde la API
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
    // Cargar etiquetas desde la API y agruparlas por extrusor
    axios
      .get("http://localhost:3000/api/v1/etiquetas")
      .then((response) => {
        if (response.status !== 200) {
          throw Error("No se pudieron cargar las etiquetas.");
        }
        const etiquetas = response.data;

        // Agrupar etiquetas por extrusor en el objeto etiquetasPorExtrusor
        etiquetas.forEach((etiqueta) => {
          const { extrusor } = etiqueta; // Asumiendo que cada etiqueta tiene un campo extrusorId
          if (!etiquetasPorExtrusor[extrusor]) {
            etiquetasPorExtrusor[extrusor] = [];
          }
          etiquetasPorExtrusor[extrusor].push(etiqueta);
        });

        setEtiquetasAgregadas(etiquetas);
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
