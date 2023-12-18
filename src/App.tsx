import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Routing/Router";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
