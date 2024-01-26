import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import "../../../style/DragAnDrop/DragAnDrop.css";
import "../../../style/cards.css";
/* import BotonOption from "../global/botonOptions"; */
import BotonOption from "../../global/botonOptions";
/* import "../../style/global/global.css"; */
import "../../../style/global/global.css";

const Ext54_2Component = ({ etiquetas, onEtiquetasChange }) => {
  const [ext54lletiquetas, setExt54lletiquetas] = useState([]);

  useEffect(() => {
    axios
      .get("https://mampara-backend-nu.vercel.app/etiquetasExt54_2")
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
  return (
    <>
      <div className="col bg-danger position">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6 className="text-center tittle">EXT54-II</h6>
        </div>
        <div>
          <ReactSortable
            value="EXT54-II"
            list={ext54lletiquetas}
            setList={(newState) => onEtiquetasChange(newState)}
            /*        setList={(newState) => handleext54lletiquetasChange(newState)} */
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
                    <div className="card-body titulosTyle ">{item.nombre}</div>
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
    </>
  );
};
export default Ext54_2Component;
