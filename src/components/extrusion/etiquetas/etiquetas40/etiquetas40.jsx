import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt40 } from "../../../../api/extrusores/apiExt40";
import localforage from "localforage";

const EtiquetaTable40 = () => {
  const [etiquetas40, setEtiquetas40] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt40, setWatch40] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas40");
        if (etiquetasLocal) {
          setEtiquetas40(etiquetasLocal);
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
    if (watchExt40 !== null) {
      console.log("etiquetas40", etiquetas40);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas40) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas40Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt40, etiquetas40);
            console.log("Etiquetas guardadas en etiquetasExt40 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas40", etiquetas40);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt40",
              error
            );
          }
        };

        guardarEtiquetas40Masivo();
      }
    }
  }, [etiquetas40]);

  const handleext40etiquetasChange = (newState) => {
    setWatch40(new Date());
    setEtiquetas40(newState);
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
      <h6 className="text-center tittle">Ext 40</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext40etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas40}
        className="position"
      >
        {etiquetas40.map((item) => (
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

export default EtiquetaTable40;
