import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlBuss2 } from "../../../../api/extrusores/apiBuss2";
import CircularProgress from "@mui/material/CircularProgress";

const EtiquetaTableBuss2 = ({ etiquetasBuss2, setEtiquetasBuss2 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("etiquetasBuss2", etiquetasBuss2);
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlBuss2);
        setEtiquetasBuss2(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API");
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetasBuss2]);

  const handleEtiquetasChange = (newState) => {
    setEtiquetasBuss2(newState);
    guardarEtiquetas(newState);
  };

  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "BUSS II",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlBuss2, etiquetasConExtrusor);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 2
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Buss II</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetasBuss2}
          className="position"
        >
          {etiquetasBuss2.map((item, index) => (
            <div key={item.id} className="etiqueta" data-id={item.id}>
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div className="card-body titulosTyle ">
                    {item.nombre}- Posición: {index + 1}
                  </div>
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
  );
};

export default EtiquetaTableBuss2;
