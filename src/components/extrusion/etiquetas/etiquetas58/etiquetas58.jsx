import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt58 } from "../../../../api/extrusores/apiExt58";
import localforage from "localforage";

const EtiquetaTable58 = () => {
  const [etiquetas58, setEtiquetas58] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt58, setWatch58] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas58");
        if (etiquetasLocal) {
          setEtiquetas58(etiquetasLocal);
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
    if (watchExt58 !== null) {
      console.log("etiquetas58", etiquetas58);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas58) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas58Masivo = async () => {
          try {
            await axios.post(apiUrlEtiquetasExt58, etiquetas58);
            console.log("Etiquetas guardadas en etiquetasExt58 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas58", etiquetas58);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt58",
              error
            );
          }
        };

        guardarEtiquetas58Masivo();
      }
    }
  }, [etiquetas58]);

  const handleext58etiquetasChange = (newState) => {
    setWatch58(new Date());
    setEtiquetas58(newState);
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
      <h6 className="text-center tittle">Ext 58</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext58etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas58}
        className="position"
      >
        {etiquetas58.map((item) => (
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

export default EtiquetaTable58;
