import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt26_1 } from "../../../../api/extrusores/apiExt26_1";
import localforage from "localforage";

const EtiquetaTable26_1 = () => {
  const [etiquetas26_1, setEtiquetas26_1] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt26_1, setWatch26_1] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetas26_1");
        if (etiquetasLocal) {
          setEtiquetas26_1(etiquetasLocal);
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
    if (watchExt26_1 !== null) {
      console.log("etiquetas26_1", etiquetas26_1);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetas26_1) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetas26_1Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetas26_1.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXT-26-I",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );

            await axios.post(apiUrlEtiquetasExt26_1, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExt26_1 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetas26_1", etiquetasConExtrusores);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExt26_1",
              error
            );
          }
        };

        guardarEtiquetas26_1Masivo();
      }
    }
  }, [etiquetas26_1, originalOrder, watchExt26_1]);

  const handleext26_1etiquetasChange = (newState) => {
    setWatch26_1(new Date());
    setEtiquetas26_1(newState);
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
      <h6 className="text-center tittle">Ext 26 I</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleext26_1etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetas26_1}
        className="position"
      >
        {etiquetas26_1.map((item, index) => (
          <div key={item.id} className="etiqueta" data-id={item.id}>
            <div className="m-3 cursor-draggable">
              <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                <div className="card-body titulosTyle ">
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

export default EtiquetaTable26_1;
