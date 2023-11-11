import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Mampara from "./components/mampara/mampara";
import Productos from "./components/productos/productos";
import Terminados from "./components/extrusion/productos-Extruidos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
