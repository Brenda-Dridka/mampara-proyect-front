import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_2 } from "../../../../api/apiExt54_2";
import localforage from "localforage";

const EtiquetaTable54_2 = () => {
  const [etiquetas54_2, setEtiquetas54_2] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt54ll, setWatch54ll] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas54_2");
        if (etiquetasLocal) {
          setEtiquetas54_2(etiquetasLocal);
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
    if (watchExt54ll !== null) {
      console.log("etiquetas54_2", etiquetas54_2);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas54_2) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas54_2Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt54_2, etiquetas54_2);
            console.log("Etiquetas guardadas en etiquetasExt54_2 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas54_2", etiquetas54_2);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt54_2",
              error
            );
          }
        };

        guardarEtiquetas54_2Masivo();
      }
    }
  }, [etiquetas54_2]);

  const handleext54lletiquetasChange = (newState) => {
    setWatch54ll(new Date());
    setEtiquetas54_2(newState);
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
      <h6 className="text-center tittle">Ext 54 II</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext54lletiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas54_2}
        className="position"
      >
        {etiquetas54_2.map((item) => (
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

export default EtiquetaTable54_2;
