import React, { createContext, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
