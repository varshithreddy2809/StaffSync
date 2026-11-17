
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiDollarSign,
  FiArrowUpRight
} from "react-icons/fi";

import "./Dashboard.css";

function Dashboard() {

  const stats = [
    {
      title: "Total Employees",
      value: "248",
      icon: <FiUsers />,
      color: "blue",
      change: "+12% this month"
    },
    {
      title: "Active Employees",
      value: "225",
      icon: <FiUserCheck />,
      color: "green",
      change: "+8% this month"
    },
    {
      title: "New Employees",
      value: "18",
      icon: <FiUserPlus />,
      color: "orange",
      change: "+5% this month"
    },
    {
      title: "Average Salary",
      value: "₹45,000",
      icon: <FiDollarSign />,
      color: "purple",
      change: "+3% this month"
    }
  ];

  const employees = [
    { id: 101, name: "Rahul Sharma", city: "Hyderabad", salary: "₹45,000" },
    { id: 102, name: "Priya Reddy", city: "Bangalore", salary: "₹52,000" },
    { id: 103, name: "Arjun Kumar", city: "Chennai", salary: "₹38,000" },
    { id: 104, name: "Sneha Rao", city: "Hyderabad", salary: "₹48,000" }
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back, Admin! Here's what's happening today.</p>
        </div>

        <button className="add-employee-btn">
          <FiUserPlus />
          Add Employee
        </button>
      </div>

      <div className="stats-grid">

        {stats.map((item, index) => (
          <div className="stat-card" key={index}>

            <div className={`stat-icon ${item.color}`}>
              {item.icon}
            </div>

            <h4>{item.title}</h4>

            <h2>{item.value}</h2>

            <span className="stat-change">
              <FiArrowUpRight />
              {item.change}
            </span>

          </div>
        ))}

      </div>

      <div className="employee-section">

        <div className="section-heading">
          <div>
            <h3>Recent Employees</h3>
            <p>Recently added employees</p>
          </div>

          <button className="view-all-btn">
            View All
          </button>
        </div>

        <div className="table-responsive">

          <table className="employee-table">

            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Salary</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>EMP-{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.city}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <span className="active-status">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
