
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

  const getLinkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-logo">
        <h2>EMS</h2>
        <span>Employee Portal</span>
      </div>

      <div className="sidebar-menu">
        <p className="menu-heading">MAIN MENU</p>

        <NavLink
          to="/"
          end
          className={getLinkClass}
          onClick={closeSidebar}
        >
          <FiGrid />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employees"
          className={getLinkClass}
          onClick={closeSidebar}
        >
          <FiUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/add-employee"
          className={getLinkClass}
          onClick={closeSidebar}
        >
          <FiUserPlus />
          <span>Add Employee</span>
        </NavLink>

        <p className="menu-heading">GENERAL</p>

        <NavLink
          to="/settings"
          className={getLinkClass}
          onClick={closeSidebar}
        >
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
