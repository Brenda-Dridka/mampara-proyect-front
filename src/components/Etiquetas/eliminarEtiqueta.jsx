import React from "react";
import axios from "axios";

export default function DeleteTagButton({ etiqueta, onDelete }) {
  const handleDelete = () => {
    if (etiqueta) {
      // Realiza una solicitud DELETE para eliminar la etiqueta utilizando Axios
      axios
        .delete(`http://localhost:3000/api/v1/etiquetas/${etiqueta.id}`)
        .then((response) => {
          if (response.status === 200) {
            // Llama a la función onDelete para eliminar la etiqueta del estado principal
            onDelete(etiqueta.id);
          } else {
            console.error("No se pudo eliminar la etiqueta.");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la etiqueta", error);
        });
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
}
