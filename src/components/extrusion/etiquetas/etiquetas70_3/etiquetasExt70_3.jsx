import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt70_3 } from "../../../../api/extrusores/apiExt70_3";
import localforage from "localforage";

const EtiquetaTableExt70_3 = () => {
  const [etiquetasExt70_3, setEtiquetasExt70_3] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchExt70_3, setWatchExt70_3] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetasExt70_3");
        if (etiquetasLocal) {
          setEtiquetasExt70_3(etiquetasLocal);
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
    if (watchExt70_3 !== null) {
      console.log("etiquetasExt70_3", etiquetasExt70_3);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetasExt70_3) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasExt70_3Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetasExt70_3.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXT70-III",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );

            await axios.post(apiUrlEtiquetasExt70_3, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExtExt70_3 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem(
              "etiquetasExt70_3",
              etiquetasConExtrusores
            );
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExtExt70_3",
              error
            );
          }
        };

        guardarEtiquetasExt70_3Masivo();
      }
    }
  }, [etiquetasExt70_3, originalOrder, watchExt70_3]);

  const handleExt70_3etiquetasChange = (newState) => {
    setWatchExt70_3(new Date());
    setEtiquetasExt70_3(newState);
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
      <h6 className="text-center tittle">Ext 70 III</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleExt70_3etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetasExt70_3}
        className="position"
      >
        {etiquetasExt70_3.map((item, index) => (
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

export default EtiquetaTableExt70_3;
