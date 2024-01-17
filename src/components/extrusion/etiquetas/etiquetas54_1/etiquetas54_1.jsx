import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_1 } from "../../../../api/extrusores/apiExt54_1";
import localforage from "localforage";

const EtiquetaTable54_1 = () => {
  const [etiquetas54_1, setEtiquetas54_1] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt54_1, setWatch54_1] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas54_1");
        if (etiquetasLocal) {
          setEtiquetas54_1(etiquetasLocal);
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
    if (watchExt54_1 !== null) {
      console.log("etiquetas54_1", etiquetas54_1);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas54_1) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas54_1Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt54_1, etiquetas54_1);
            console.log("Etiquetas guardadas en etiquetasExt54_1 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas54_1", etiquetas54_1);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt54_1",
              error
            );
          }
        };

        guardarEtiquetas54_1Masivo();
      }
    }
  }, [etiquetas54_1]);

  const handleext54_1etiquetasChange = (newState) => {
    setWatch54_1(new Date());
    setEtiquetas54_1(newState);
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
      <h6 className="text-center tittle">Ext 54 I</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext54_1etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas54_1}
        className="position"
      >
        {etiquetas54_1.map((item) => (
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

export default EtiquetaTable54_1;
