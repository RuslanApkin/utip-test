import React from "react";
import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header";
import AddRow from "./Pages/AddRow/AddRow";

function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addrow" element={<AddRow />} />
      </Routes>
    </>
  );
}

export default App;
