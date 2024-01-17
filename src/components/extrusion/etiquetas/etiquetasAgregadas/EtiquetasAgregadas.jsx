import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../../../style/DragAnDrop/DragAnDrop.css";

import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import axios from "axios";
import localforage from "localforage";

import { apiUrl } from "../../../../api/apiEtiquetas";

const EtiquetaTable = ({ etiquetas, setEtiquetas }) => {
  //const [etiquetas, setEtiquetas] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchEtiquetas, setWatchEtiquetas] = useState(null);

  //const [isOrderChanged, setIsOrderChanged] = useState(false);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas");
        if (etiquetasLocal) {
          setEtiquetas(etiquetasLocal);
          setOriginalOrder([...etiquetasLocal]); // Guardar el orden original
          console.log("Etiquetas cargadas localmente con éxito");
        }
      } catch (error) {
        console.error("Error al cargar etiquetas localmente", error);
      }
    };

    cargarEtiquetasLocalmente();
  }, []);

  useEffect(() => {
    if (watchEtiquetas !== null) {
      console.log("etiquetas", etiquetas);
      //verificaqcion de los cambios
      const orderChanged =
        JSON.stringify(etiquetas) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasMasivo = async () => {
          try {
            await axios.post(apiUrl, etiquetas);
            console.log("Etiquetas guardadas en etiquetas con éxito");

            // Almacena las etiquetas localmente
            await localforage.setItem("etiquetas", etiquetas);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error("Error al guardar las etiquetas en etiquetas", error);
          }
        };

        guardarEtiquetasMasivo();
      }
    }
  }, [etiquetas]);

  const handlEetiquetasChange = (newState) => {
    setWatchEtiquetas(new Date());
    setEtiquetas(newState);
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
        <ReactSortable
          group="groupName"
          animation={200}
          setList={(newState) => handlEetiquetasChange(newState)}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetas}
          className="position"
        >
          {etiquetas.map((item) => (
            <div
              key={item.id}
              className="etiqueta"
              /* style={{
                backgroundColor:
                  item.estado === "pendiente" ? "#FFE224" : labelColor,
              }} */
              data-id={item.id}
            >
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
                    {/*   {item.fecha} */}
                  </p>
                  <p className="tamañoLetra">{item.clave}</p>
                  <p className="tamañoLetra">{item.kilos}kg</p>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
};

export default EtiquetaTable;
