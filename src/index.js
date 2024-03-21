import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/UserContextProvider";
import { StepsProvider } from "./context/StepsProvider";
import { StitchBillProvider } from "./context/StitchBillProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <StepsProvider>
        <StitchBillProvider>
          <App />
        </StitchBillProvider>
      </StepsProvider>
    </UserContextProvider>
  </React.StrictMode>
);
