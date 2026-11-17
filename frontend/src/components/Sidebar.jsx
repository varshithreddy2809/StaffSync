
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

      <div className="sidebar-logo">
        <h2>EMS</h2>
        <span>Employee Portal</span>
      </div>

      <div className="sidebar-menu">

        <p className="menu-heading">MAIN MENU</p>

        <NavLink to="/" className="sidebar-link" onClick={closeSidebar}>
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees" className="sidebar-link" onClick={closeSidebar}>
          <FiUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/add-employee" className="sidebar-link" onClick={closeSidebar}>
          <FiUserPlus />
          <span>Add Employee</span>
        </NavLink>

        <p className="menu-heading">GENERAL</p>

        <NavLink to="/settings" className="sidebar-link" onClick={closeSidebar}>
          <FiSettings />
          <span>Settings</span>
        </NavLink>

      </div>

      <div className="sidebar-bottom">
        <FiLogOut />
        <span>Logout</span>
      </div>

    </aside>
  );
}

export default Sidebar;
