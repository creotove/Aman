import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Suspense } from "react";
import DefaultLayout from "./Layout/DefaultLayout";
import { Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Customers from "./Pages/Customers";
import Employees from "./Pages/Employees";
import GaajBtn from "./Pages/GaajBtn";
import Profile from "./Pages/Profile";
import ClothingMgmt from "./Pages/ClothingMgmt";
import EmployeeProfile from "./Pages/EmployeeProfile";
import NewEmployee from "./Pages/NewEmployee.js";
import CustomerProfile from "./Pages/CustomerProfile";
import StitchBill from "./Pages/StitchBill";
import SoldBill from "./Pages/SoldBill";
import AddWork from "./Pages/AddWork";
import GiveMoney from "./Pages/GiveMoney";
import AdvanceMoney from "./Pages/AdvanceMoney";
import EditEmployeeProfile from "./Pages/EditEmployeeProfile.js";
import Store from "./Pages/Store.js";

// "proxy": "http://localhost:8080/",

function App() {
  return (
    <div className="dashboard flex">
      <Router>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Dashboard />} />
              {/* The index route for the Dashboard */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/sold-bill" element={<SoldBill />} />
              <Route path="/customers/stitch-bill" element={<StitchBill />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/new-employee" element={<NewEmployee />} />
              <Route path="/employees/add-work/:id" element={<AddWork />} />
              <Route path="/employees/give-money/:id" element={<GiveMoney />} />
              <Route path="/employees/advance/:id" element={<AdvanceMoney />} />
              <Route path="/employees/edit/:id" element={<EditEmployeeProfile />} />
              <Route path="/gaaj-button" element={<GaajBtn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/clothing-mgmt" element={<ClothingMgmt />} />
              <Route path="/store" element={<Store />} />
              <Route path="/employees/:id" element={<EmployeeProfile />} />
              <Route path="/customers/:id" element={<CustomerProfile />} />
            </Route>
            <Route path="login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
