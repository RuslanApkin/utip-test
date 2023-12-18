import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Header from "../Components/Header";
import AddRow from "../Pages/AddRow/AddRow";

export const Root = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addrow" element={<AddRow />} />
      </Routes>
    </>
  );
};
