
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiGrid,
    FiUsers,
    FiUserPlus,
    FiUser,
    FiSettings,
    FiLogOut
} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();

    const closeSidebar = () => setSidebarOpen(false);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("adminEmail");
        setSidebarOpen(false);
        navigate("/login", { replace: true });
    };

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

                <NavLink to="/profile" className="sidebar-link" onClick={closeSidebar}>
                    <FiUser />
                    <span>My Profile</span>
                </NavLink>

                <NavLink to="/settings" className="sidebar-link" onClick={closeSidebar}>
                    <FiSettings />
                    <span>Settings</span>
                </NavLink>
            </div>

            <div className="sidebar-bottom" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
            </div>
        </aside>
    );
}

export default Sidebar;
