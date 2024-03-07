// validationConfig.js

import axios from "axios";

// Función para obtener los datos del usuario logeado y validar los roles y permisos
export const validateRolesAndPermissions = async () => {
  const user = JSON.parse(localStorage.getItem("currentUserActive"));

  if (!user) {
    return null;
  }

  try {
    // Realiza una solicitud HTTP a tu API para obtener la información del usuario
    const response = await axios.get(`http://localhost:3000/users/${user.id}`);
    const userData = response.data;

    // Aquí deberías ajustar el código según la estructura de tu API
    const role = userData.role;
    const permissions = role.permissions;

    user.role = role;
    user.role.permissions = permissions;

    return user;
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    return null;
  }
};

// Función para validar si el usuario tiene permiso para una acción específica
export const validateAction = (user, permiso) => {
  if (user && user.role && user.role.permissions) {
    return user.role.permissions.map((p) => p.permission).includes(permiso);
  }

  return false;
};
