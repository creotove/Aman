import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StepsProvider } from "./context/StepsProvider";
import { StitchBillProvider } from "./context/StitchBillProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <StepsProvider>
          <StitchBillProvider>
            <Routes>
              <Route
                path="/*"
                element={
                  <div className="dashboard flex">
                    <App />
                  </div>
                }
              />
            </Routes>
          </StitchBillProvider>
        </StepsProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
