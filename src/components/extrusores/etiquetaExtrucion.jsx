import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import "../../style/DragAnDrop/DragAnDrop.css";

import "../../style/cards.css";
import "../../style/global/global.css";

const EtiquetaTable = ({ etiquetas, setEtiquetas }) => {
  const onSort = (sortedList) => {
    setEtiquetas(sortedList);
  };
  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      <div className="position etiquetasAgregadas">
        <h6 className="text-center tittle">Etiquetas Agregadas</h6>
        <ReactSortable
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          list={etiquetas}
          /* setList={setEtiquetasAgregadas} */
          setList={onSort}
          /*          setList={(newState) => handlEtiquetasChange(newState)} */
          group="shared-group-name"
          className="position"
        >
          {etiquetas.map((item) => (
            <div
              key={item.id}
              className="etiqueta"
              /* style={{
                backgroundColor:
                  item.estado === "pendiente" ? "#FFE224" : labelColor,
              }} */
              data-id={item.id}
            >
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
                    {/*    {item.fecha} */}
                  </p>
                  <p className="tamañoLetra">{item.clave}</p>
                  <p className="tamañoLetra">{item.kilos}kg</p>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
};

export default EtiquetaTable;
