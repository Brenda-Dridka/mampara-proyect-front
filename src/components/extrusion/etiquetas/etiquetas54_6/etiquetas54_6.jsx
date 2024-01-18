import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_6 } from "../../../../api/extrusores/apiExt54_6";
import localforage from "localforage";

const EtiquetaTable54_6 = () => {
  const [etiquetas54_6, setEtiquetas54_6] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt54_6, setWatch54_6] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas54_6");
        if (etiquetasLocal) {
          setEtiquetas54_6(etiquetasLocal);
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
    if (watchExt54_6 !== null) {
      console.log("etiquetas54_6", etiquetas54_6);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas54_6) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas54_6Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetas54_6.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXT54-VI",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );
            await axios.post(apiUrlEtiquetasExt54_6, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExt54_6 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas54_6", etiquetasConExtrusores);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt54_6",
              error
            );
          }
        };

        guardarEtiquetas54_6Masivo();
      }
    }
  }, [etiquetas54_6, originalOrder, watchExt54_6]);

  const handleext54_6etiquetasChange = (newState) => {
    setWatch54_6(new Date());
    setEtiquetas54_6(newState);
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
      <h6 className="text-center tittle">Ext 54 VI</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext54_6etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas54_6}
        className="position"
      >
        {etiquetas54_6.map((item, index) => (
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
    </div>
  );
};

export default EtiquetaTable54_6;
