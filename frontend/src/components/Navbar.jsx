
import {
  FiSearch,
  FiBell,
  FiUser,
  FiChevronDown,
  FiMenu
} from "react-icons/fi";

import "./Navbar.css";

function Navbar({ setSidebarOpen }) {
  return (
    <nav className="top-navbar">

      <div className="navbar-left">

        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <FiMenu />
        </button>

        <div className="navbar-title">
          <h3>Employee Portal</h3>
          <p>Manage your workforce efficiently</p>
        </div>

      </div>

      <div className="navbar-right">

        <div className="navbar-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>

        <div className="navbar-notification">
          <FiBell />
          <span className="notification-dot"></span>
        </div>

        <div className="navbar-profile">
          <div className="profile-icon">
            <FiUser />
          </div>

          <div className="profile-info">
            <h4>Admin</h4>
            <span>Administrator</span>
          </div>

          <FiChevronDown />
        </div>

      </div>

    </nav>
  );
}

export default Navbar;
