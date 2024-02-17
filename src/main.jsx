import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Mampara from "./components/mampara/mampara";
import Productos from "./components/productos/productos";
import Terminados from "./components/extrusion/productoExtruidoPrueba1/TableProductoExtruido";

import Login from "./components/login/Login";
import Welcome from "./components/login/Welcome";
/* import EntradasMolinos from "./components/Molinos/entradasmolinos/entradas";
 */
const router = createBrowserRouter([
  {
    /* path: "/", */
    element: <Root />,

    errorElement: <ErrorPage />,

    children: [
      {
        path: "/mampara",
        element: <Mampara />,
      },
      {
        path: "/productos",
        element: <Productos />,
      },
      {
        path: "/terminados",
        element: <Terminados />,
      },
      /*   {
        path: "/entrada-molinos",
        element: <EntradasMolinos />,
      }, */
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

/* const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome/:username" element={<Welcome />} />
      </Routes>
    </Router>
  );
};
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/*     <App /> */}
  </React.StrictMode>
);
