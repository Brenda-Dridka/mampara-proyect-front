import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlBuss1 } from "../../../../api/extrusores/apiBuss1";
import localforage from "localforage";

const EtiquetaTableBuss1 = () => {
  const [etiquetasBuss1, setEtiquetasBuss1] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [watchBuss1, setWatchBuss1] = useState(null);

  useEffect(() => {
    // Cargar etiquetas almacenadas localmente al montar el componente
    const cargarEtiquetasLocalmente = async () => {
      try {
        const etiquetasLocal = await localforage.getItem("etiquetasBuss1");
        if (etiquetasLocal) {
          setEtiquetasBuss1(etiquetasLocal);
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
    if (watchBuss1 !== null) {
      console.log("etiquetasBuss1", etiquetasBuss1);

      // Verificar si el orden ha cambiado
      const orderChanged =
        JSON.stringify(etiquetasBuss1) !== JSON.stringify(originalOrder);

      if (orderChanged) {
        const guardarEtiquetasBuss1Masivo = async () => {
          try {
            const etiquetasConExtrusores = etiquetasBuss1.map(
              (etiqueta, index) => ({
                ...etiqueta,
                extrusor: "EXTBUSS-I",
                posicion: index + 1, // Añadir el número de posición (+1 porque los índices comienzan en 0)
              })
            );

            await axios.post(apiUrlBuss1, etiquetasConExtrusores);
            console.log("Etiquetas guardadas en etiquetasExtBuss1 con éxito");

            // Almacena las etiquetas localmente solo si el orden ha cambiado
            await localforage.setItem("etiquetasBuss1", etiquetasConExtrusores);
            console.log("Etiquetas guardadas localmente con éxito");
          } catch (error) {
            console.error(
              "Error al guardar las etiquetas en etiquetasExtBuss1",
              error
            );
          }
        };

        guardarEtiquetasBuss1Masivo();
      }
    }
  }, [etiquetasBuss1, originalOrder, watchBuss1]);

  const handleBuss1etiquetasChange = (newState) => {
    setWatchBuss1(new Date());
    setEtiquetasBuss1(newState);
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
      <h6 className="text-center tittle">Buss I</h6>
      <ReactSortable
        group="groupName"
        animation={200}
        setList={(newState) => handleBuss1etiquetasChange(newState)}
        delayOnTouchStart={true}
        delay={2}
        list={etiquetasBuss1}
        className="position"
      >
        {etiquetasBuss1.map((item, index) => (
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

export default EtiquetaTableBuss1;
