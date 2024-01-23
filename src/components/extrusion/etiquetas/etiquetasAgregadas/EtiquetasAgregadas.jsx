import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { apiUrl } from "../../../../api/apiEtiquetas";

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

    // Guardar automáticamente las etiquetas actualizadas
    guardarEtiquetas(newState);
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
              <div key={item.id} className="etiqueta" data-id={item.id}>
                <div className="m-3 cursor-draggable">
                  <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                    <div className="card-body titulosTyle ">{item.nombre}</div>
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
        )}
      </div>
    </>
  );
};

export default EtiquetaTable;
