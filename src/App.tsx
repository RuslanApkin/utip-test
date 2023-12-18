import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Routing/Router";
import "./Styles/index.css";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
