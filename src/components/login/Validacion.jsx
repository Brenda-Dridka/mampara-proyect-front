import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./users/UserContext";

const PermissionValidator = ({ action, children }) => {
  const { username } = useUser();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el rol del usuario desde la API de usuarios
        const userResponse = await axios.get(
          `https://mampara-backend.vercel.app/users/${username}`
        );
        const userRole = userResponse.data.rol_usuario;

        // Obtener los roles desde la API de roles
        const rolesResponse = await axios.get(
          `https://mampara-backend.vercel.app/roles`
        );
        const roles = rolesResponse.data;

        // Verificar si el rol del usuario tiene los permisos necesarios
        const roleWithPermissions = roles.find(
          (role) => role.nombre === userRole
        );
        if (roleWithPermissions) {
          const permissions = roleWithPermissions.permisos;
          const hasNeededPermission = permissions.includes(action);
          setHasPermission(hasNeededPermission);
        } else {
          setHasPermission(false);
        }
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
        setHasPermission(false); // En caso de error, no conceder permisos
      }
    };

    fetchData();
  }, [action, username]);

  return hasPermission ? children : null;
};

export default PermissionValidator;
