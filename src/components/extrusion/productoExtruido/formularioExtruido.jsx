import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ExtrusionFormDialog from "./ExtrusionFormDialog";
import {
  apiUrlProductosExtruidos,
  createProductosExtruidos,
} from "../../../api/extrusores/productoExtruido";

const ProductoExtruido = ({ productoExtruido, setProductoExtruido }) => {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlProductosExtruidos);
        setProductoExtruido(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setProductoExtruido]);

  const handleEtiquetasChange = (newState) => {
    setProductoExtruido(newState);
    console.log("Productos Extruidos posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const handleAddEtiqueta = (event) => {
    const nuevaEtiqueta = {
      clave: "", // Agrega la lógica para obtener la clave
      nombre: "", // Agrega la lógica para obtener el nombre
      extrusor: "EXT54-II",
      fechaTerminacion: "", // Ingresa la fecha según tu lógica
      horaTermino: "", // Ingresa la hora según tu lógica
      cantidadFinal: "", // Ingresa la cantidad según tu lógica
    };

    setProductoExtruido([...productoExtruido, nuevaEtiqueta]);

    // Abre el diálogo
    setOpenDialog(true);
  };

  const guardarEtiquetas = async (etiquetas) => {
    try {
      await createProductosExtruidos(etiquetas);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Agrega lógica para obtener y actualizar los datos de la etiqueta actual
      const etiquetaActualizada = {
        ...formData,
        extrusor: "EXT54-II",
      };

      // Realiza la solicitud para guardar la etiqueta
      await createProductosExtruidos([etiquetaActualizada]);

      console.log("Etiqueta guardada con éxito");

      // Realizar lógica adicional según tus necesidades
      // ...

      // Cerrar el diálogo
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar la etiqueta", error);
    }
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Productos extruidos</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={productoExtruido}
          className="position"
          onAdd={handleAddEtiqueta}
        >
          {productoExtruido.map((item, index) => (
            <div key={item.id} data-id={item.id}>
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div
                    className="card-body titulosTyle "
                    style={{ display: "flex", justifyContent: " space-around" }}
                  >
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
                    {" "}
                    {formatDateWithoutTime(item.fecha)}
                  </p>
                  <p className="tamañoLetra">{item.clave}</p>
                  <p className="tamañoLetra">{item.kilos}kg</p>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      )}
      <ExtrusionFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ProductoExtruido;
