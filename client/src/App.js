import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Container } from "@mui/material";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import AddCar from "./pages/AddCar";

function App() {
  return (
    <div className="App">
      <Router basename={"/"}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/add" element={<AddCar />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
