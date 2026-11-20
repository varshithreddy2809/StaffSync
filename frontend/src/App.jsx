
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-content">
        <Navbar setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/employees"
          element={
            <DashboardLayout>
              <EmployeeList />
            </DashboardLayout>
          }
        />

        <Route
          path="/add-employee"
          element={
            <DashboardLayout>
              <AddEmployee />
            </DashboardLayout>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <DashboardLayout>
              <EditEmployee />
            </DashboardLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
