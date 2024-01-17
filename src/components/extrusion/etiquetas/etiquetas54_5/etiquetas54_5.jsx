import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_5 } from "../../../../api/extrusores/apiExt54_5";
import localforage from "localforage";

const EtiquetaTable54_5 = () => {
  const [etiquetas54_5, setEtiquetas54_5] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt54_5, setWatch54_5] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas54_5");
        if (etiquetasLocal) {
          setEtiquetas54_5(etiquetasLocal);
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
    if (watchExt54_5 !== null) {
      console.log("etiquetas54_5", etiquetas54_5);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas54_5) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas54_5Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt54_5, etiquetas54_5);
            console.log("Etiquetas guardadas en etiquetasExt54_5 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas54_5", etiquetas54_5);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt54_5",
              error
            );
          }
        };

        guardarEtiquetas54_5Masivo();
      }
    }
  }, [etiquetas54_5]);

  const handleext54_5etiquetasChange = (newState) => {
    setWatch54_5(new Date());
    setEtiquetas54_5(newState);
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Ext 54 V</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext54_5etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas54_5}
        className="position"
      >
        {etiquetas54_5.map((item) => (
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
    </div>
  );
};

export default EtiquetaTable54_5;
