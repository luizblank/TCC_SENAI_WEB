import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import NavBar from "./components/NavBar";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Processes from "./pages/Processes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Map/>,
  },
  {
    path: "/processes/:sector",
    element: <Processes/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router} />
  </React.StrictMode>
)
