import React, {useState, useContext} from "react";
import './App.css';
import LoginPage from "./pages/login.page";
import RegisterBuyer from "./pages/registerBuyer.page";
import RegisterSupplier from "./pages/registerSupplier.page";
import HomePage from "./pages/home.page";
import CreatePurchaseOrder from "./pages/createPurchaseOrder.page";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/registerBuyer",
    element: <RegisterBuyer/>
  },
  {
    path: "/registerSupplier",
    element: <RegisterSupplier/>
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/createPurchaseOrder",
    element: <CreatePurchaseOrder/>
  }
])

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <RouterProvider router={router} />
      </React.Fragment>
    </LocalizationProvider>
  );
}

export default App;
