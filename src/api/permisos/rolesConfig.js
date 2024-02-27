// rolesConfig.js
const rolesConfig = {
  superadmin: [
    "extrusores.mostrar",
    "extrusores.crear",
    "extrusores.editar",
    "extrusores.pendiente",
    "extrusores.extruir",
    "extrusores.exportacion",
    "extrusores.mover",
    "productos.mostrar",
    "productos.crear",
    "productos.editar",
    "productos.eliminar",
    "productos.exportacion",
    "productos_estruidos.mostrar",
  ],
  admin: [
    "extrusores.mostrar",
    "extrusores.crear",
    "extrusores.editar",
    "extrusores.pendiente",
    "extrusores.extruir",
    "extrusores.mover",
    "productos.mostrar",
    "productos.crear",
    "productos.editar",
    "productos.eliminar",
    "productos_estruidos.mostrar",
  ],
  supervisor: [
    "extrusores.mostrar",
    "extrusores.editar",
    "extrusores.pendiente",
    "productos.mostrar",
    "productos.crear",
    "productos_estruidos.mostrar",
  ],
  user: [
    "extrusores.mostrar",
    "productos.mostrar",
    "productos_estruidos.mostrar",
  ],
};

export default rolesConfig;
