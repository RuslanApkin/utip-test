import React from 'react';
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Header from './Components/Header';
import AddRow from './Pages/AddRow/AddRow';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product/:productId" element={<AddRow />} />
    </Routes>
    </>
  );
}

export default App;
