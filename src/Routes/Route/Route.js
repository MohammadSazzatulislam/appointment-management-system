import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Appointment from "../../Pages/Appointment/Appointment";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
    ],
  },
]);
