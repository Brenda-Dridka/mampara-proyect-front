import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./users/UserContext";

const PermisoValidator = ({ permiso, children }) => {
  const { username } = useUser();
  const [tienePermiso, setTienePermiso] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el usuario desde la API
        const userResponse = await axios.get(
          `http://localhost:3000/users?username=${username}`
        );
        const userData = userResponse.data.find(
          (user) => user.username === username
        );
        console.log("Usuario que esta logueado", userData);

        if (!userData) {
          console.error(
            "No se encontró el usuario con el nombre proporcionado."
          );
          return;
        }

        const roleId = userData.rol_usuario;
        //console.log("PERMISOS", roleId);

        // Obtener el rol del usuario desde la API
        const roleResponse = await axios.get(
          `http://localhost:3000/roles/${roleId}`
        );
        const roleData = roleResponse.data;
        //console.log("permisos Rol", roleData.data.permisos);

        if (!roleData) {
          console.error("No se encontró el rol del usuario.");
          return;
        }

        // Verificar si el permiso del usuario es igual al permiso de validación
        if (
          roleData.data.permisos &&
          roleData.data.permisos.includes(permiso)
        ) {
          setTienePermiso(true);
          //console.log("Permisos tomados:", roleData.data.permisos);
        }
      } catch (error) {
        console.error("Error al verificar permisos:", error);
      }
    };

    //console.log("Llamando a la función fetchData con permiso:", permiso);
    fetchData();
  }, [permiso, username]);
  //console.log("username", username);

  return tienePermiso ? children : null;
};

export default PermisoValidator;
