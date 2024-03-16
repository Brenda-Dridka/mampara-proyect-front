import { useEffect } from "react";
import axios from "axios";
import { useUser } from "./users/UserContext";

const Validacion = () => {
  const { username } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          console.log("Error: Nombre de usuario no proporcionado.");
          return;
        }

        // Obtener el usuario actual de la API
        const userResponse = await axios.get("http://localhost:3000/users", {
          params: {
            username: username,
          },
        });

        console.log("Respuesta de la API de usuarios:", userResponse.data);

        const user = userResponse.data;

        if (!user) {
          console.log(
            "Error: No se encontró ningún usuario con el nombre de usuario proporcionado."
          );
          return;
        }

        // Obtener el rol del usuario
        const roleId = user.rol_usuario;

        // Consultar los permisos asociados al rol
        const roleResponse = await axios.get(
          `http://localhost:3000/roles/${roleId}`
        );

        const role = roleResponse.data;

        // Verificar si el rol tiene los permisos necesarios
        const hasPermission = role.permisos.includes("extrusores.mostrar");

        // Realizar acciones según los permisos
        if (hasPermission) {
          // Aquí puedes realizar las acciones permitidas
          console.log(
            "Acceso concedido. El usuario tiene permisos para mostrar los componentes."
          );
        } else {
          // Aquí puedes manejar la lógica para restringir el acceso
          // Por ejemplo, redireccionar a una página de acceso denegado
          console.log(
            "Acceso denegado. El usuario no tiene permisos para mostrar los componentes."
          );
        }
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
      }
    };

    fetchData();
  }, [username]);

  return null; // No necesitamos renderizar nada en este componente
};

export default Validacion;
