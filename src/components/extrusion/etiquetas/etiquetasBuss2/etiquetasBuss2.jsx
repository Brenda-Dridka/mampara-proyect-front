import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlBuss2 } from "../../../../api/extrusores/apiBuss2";
import localforage from "localforage";

const EtiquetaTableBuss2 = () => {
  const [etiquetasBuss2, setEtiquetasBuss2] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchBuss2, setWatchBuss2] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetasBuss2");
        if (etiquetasLocal) {
          setEtiquetasBuss2(etiquetasLocal);
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
    if (watchBuss2 !== null) {
      console.log("etiquetasBuss2", etiquetasBuss2);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetasBuss2) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasBuss2Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetasBuss2.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXTBUSS-II",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );

            await axios.post(apiUrlBuss2, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExtBuss2 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetasBuss2", etiquetasConExtrusores);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExtBuss2",
              error
            );
          }
        };

        guardarEtiquetasBuss2Masivo();
      }
    }
  }, [etiquetasBuss2, originalOrder, watchBuss2]);

  const handleBuss2etiquetasChange = (newState) => {
    setWatchBuss2(new Date());
    setEtiquetasBuss2(newState);
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 2
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Buss II</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleBuss2etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetasBuss2}
        className="position"
      >
        {etiquetasBuss2.map((item, index) => (
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

export default EtiquetaTableBuss2;
