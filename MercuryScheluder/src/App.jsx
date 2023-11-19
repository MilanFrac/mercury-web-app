import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Calendar from "./routes/Calendar";
import ErrorPage from "./routes/Errors/ErrorPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Matarnia from "./routes/Matarnia";
import CityMeble from "./routes/CityMeble";
import Dashboard from "./routes/Dashboard";
import PruszczGdański from "./routes/PruszczGdański";
import Tczew from "./routes/Tczew";
import Form from "./routes/Form"
import FullInfo from "./routes/FullInfo";
const AppLayout = () => {
  return (
    <>
      <Header />
      <br></br>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Calendar />,
      },
      {
        path: "matarnia",
        element: <Matarnia />,
      },
      {
        path: "cityMeble",
        element: <CityMeble />,
      },
      {
        path: "pruszczGdanski",
        element: <PruszczGdański />,
      },
      {
        path: "tczew",
        element: <Tczew />,
      },
      {
        path: "forms",
        element: <Form/>
      },
      {
        path: "fullInfo",
        element: <FullInfo/>
      },
      {
        path: "dashboard",
        element: <Dashboard/>

      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

export default App;