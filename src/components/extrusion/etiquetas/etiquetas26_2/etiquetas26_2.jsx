import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt26_2 } from "../../../../api/extrusores/apiExt26_2";
import localforage from "localforage";

const EtiquetaTable26_2 = () => {
  const [etiquetas26_2, setEtiquetas26_2] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt26_2, setWatch26_2] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas26_2");
        if (etiquetasLocal) {
          setEtiquetas26_2(etiquetasLocal);
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
    if (watchExt26_2 !== null) {
      console.log("etiquetas26_2", etiquetas26_2);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas26_2) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas26_2Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetas26_2.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXT-26-II",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );

            await axios.post(apiUrlEtiquetasExt26_2, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExt26_2 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas26_2", etiquetasConExtrusores);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt26_2",
              error
            );
          }
        };

        guardarEtiquetas26_2Masivo();
      }
    }
  }, [etiquetas26_2, originalOrder, watchExt26_2]);

  const handleext26_2etiquetasChange = (newState) => {
    setWatch26_2(new Date());
    setEtiquetas26_2(newState);
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
      <h6 className="text-center tittle">Ext 26 II</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext26_2etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas26_2}
        className="position"
      >
        {etiquetas26_2.map((item, index) => (
          <div key={item.id} className="etiqueta" data-id={item.id}>
            <div className="m-3 cursor-draggable">
              <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                <div className="card-body titulosTyle ">
                  {" "}
                  {item.nombre} - Posición: {index + 1}
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

export default EtiquetaTable26_2;
