// validation.js
import rolesConfig from "../../api/permisos/rolesConfig";

const validateAction = (action, rolUsuario) => {
  // Verificar si la acción está permitida para el rol actual
  return rolesConfig[rolUsuario] && rolesConfig[rolUsuario].includes(action);
};

export default validateAction;
