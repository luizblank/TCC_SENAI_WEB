import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import "./index.css";

import NavBar from "./components/NavBar";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Processes from "./pages/Processes";
import Authentication from "./pages/Authentication";
import UpdatePassword from "./pages/UpdatePassword";
import SendEmail from "./pages/SendEmail";

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
  {
    path: "/auth",
    element: <Authentication/>,
  },
  {
    path: "/update/:hash",
    element: <UpdatePassword/>
  },
  {
    path: "/sendverification",
    element: <SendEmail/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Analytics/>
    <SpeedInsights/>
    <NavBar/>
    <RouterProvider router={router} />
  </React.StrictMode>
)
