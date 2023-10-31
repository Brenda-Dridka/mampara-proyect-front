import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import BotonOption from "../global/botonOptions";
import "../../style/global/global.css";
import AgregarProducto from "../productos/formulario";
import DeleteTagButton from "../Etiquetas/eliminarEtiqueta";

export default function Component2() {
  const [labelColor, setLabelColor] = React.useState("#ffffff"); // Estado para el color de la etiqueta

  const [etiquetasAgregadas, setEtiquetasAgregadas] = useState([]);

  const [etiquetasAbajo17, setEtiquetasAbajo17] = useState([]);

  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/extrusores")
      .then((response) => {
        return response.json();
      })
      .then((articulos) => {
        setArticulos(articulos);
      });
  }, []);

  useEffect(() => {
    const fetchEtiquetas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/etiquetas");
        if (!response.ok) {
          throw new Error("No se pudo cargar las etiquetas.");
        }
        const etiquetas = await response.json();
        setEtiquetasAgregadas(etiquetas);
      } catch (error) {
        console.error("Error al cargar etiquetas:", error);
      }
    };

    fetchEtiquetas();
  }, []);

  const handleTagDelete = (tagId) => {
    // Elimina la etiqueta del estado local
    setEtiquetasAgregadas(
      etiquetasAgregadas.filter((item) => item.id !== tagId)
    );
  };
  // Función para formatear la fecha
  function formatDateWithoutTime(date) {
    // Convierte la fecha en un objeto Date
    const parsedDate = new Date(date);
    // Formatea la fecha como "DD/MM/AAAA"
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
            {articulos.map((articulos) => (
              <div className="col bg-danger position">
                <h6 className="text-center tittle">{articulos.nombre}</h6>
                <ReactSortable
                  list={etiquetasAbajo17}
                  setList={setEtiquetasAbajo17}
                  group="shared-group-name"
                  className="position"
                >
                  {etiquetasAbajo17.map((item) => (
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
                          {console.log("Valor de polvos:", item.polvos)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
