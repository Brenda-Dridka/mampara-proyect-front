import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt70_1 } from "../../../../api/extrusores/apiExt70_1";
import localforage from "localforage";

const EtiquetaTableExt70_1 = () => {
  const [etiquetasExt70_1, setEtiquetasExt70_1] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt70_1, setWatchExt70_1] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetasExt70_1");
        if (etiquetasLocal) {
          setEtiquetasExt70_1(etiquetasLocal);
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
    if (watchExt70_1 !== null) {
      console.log("etiquetasExt70_1", etiquetasExt70_1);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetasExt70_1) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasExt70_1Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt70_1, etiquetasExt70_1);
            console.log("Etiquetas guardadas en etiquetasExtExt70_1 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetasExt70_1", etiquetasExt70_1);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExtExt70_1",
              error
            );
          }
        };

        guardarEtiquetasExt70_1Masivo();
      }
    }
  }, [etiquetasExt70_1]);

  const handleExt70_1etiquetasChange = (newState) => {
    setWatchExt70_1(new Date());
    setEtiquetasExt70_1(newState);
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
      <h6 className="text-center tittle">Ext 70 I</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleExt70_1etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetasExt70_1}
        className="position"
      >
        {etiquetasExt70_1.map((item) => (
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

export default EtiquetaTableExt70_1;
