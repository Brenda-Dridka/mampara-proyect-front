import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Mampara from "./components/mampara/mampara";
import Productos from "./components/productos/productos";
import Terminados from "./components/extrusion/productoExtruidoPrueba1/TableProductoExtruido";
import Login from "./components/login/Login";
import PrivateRoute from "./PrivateRoute";
import { UserProvider } from "./components/login/users/UserContext";

const App = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  const router = createBrowserRouter([
    {
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/mampara",
          element: (
            <PrivateRoute authenticated={authenticated} element={<Mampara />} />
          ),
        },
        {
          path: "/productos",
          element: (
            <PrivateRoute
              authenticated={authenticated}
              element={<Productos />}
            />
          ),
        },
        {
          path: "/terminados",
          element: (
            <PrivateRoute
              authenticated={authenticated}
              element={<Terminados />}
            />
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <Login
          setAuthenticated={setAuthenticated}
          authenticated={authenticated}
        />
      ),
    },
  ]);

  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
