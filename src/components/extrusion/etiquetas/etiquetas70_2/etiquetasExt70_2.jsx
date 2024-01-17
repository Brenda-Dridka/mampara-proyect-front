import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt70_2 } from "../../../../api/extrusores/apiExt70_2";
import localforage from "localforage";

const EtiquetaTableExt70_2 = () => {
  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt70_2, setWatchExt70_2] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetasExt70_2");
        if (etiquetasLocal) {
          setEtiquetasExt70_2(etiquetasLocal);
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
    if (watchExt70_2 !== null) {
      console.log("etiquetasExt70_2", etiquetasExt70_2);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetasExt70_2) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasExt70_2Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt70_2, etiquetasExt70_2);
            console.log("Etiquetas guardadas en etiquetasExtExt70_2 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetasExt70_2", etiquetasExt70_2);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExtExt70_2",
              error
            );
          }
        };

        guardarEtiquetasExt70_2Masivo();
      }
    }
  }, [etiquetasExt70_2]);

  const handleExt70_2etiquetasChange = (newState) => {
    setWatchExt70_2(new Date());
    setEtiquetasExt70_2(newState);
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
      <h6 className="text-center tittle">Ext 70 II</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleExt70_2etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetasExt70_2}
        className="position"
      >
        {etiquetasExt70_2.map((item) => (
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

export default EtiquetaTableExt70_2;
