
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiDollarSign,
  FiMapPin,
  FiUserPlus,
  FiArrowUpRight
} from "react-icons/fi";

import { getAllEmployees } from "../services/EmployeeService";
import "./Dashboard.css";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadEmployees = async () => {
      try {
        const response = await getAllEmployees();

        if (!ignore) {
          setEmployees(response.data);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);

        if (!ignore) {
          setError(
            "Unable to load employee data. Please check the backend."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      ignore = true;
    };
  }, []);

  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  );

  const averageSalary =
    totalEmployees > 0 ? totalSalary / totalEmployees : 0;

  const totalCities = new Set(
    employees.map(employee => employee.city).filter(Boolean)
  ).size;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <FiUsers />,
      color: "blue"
    },
    {
      title: "Average Salary",
      value: `₹${averageSalary.toLocaleString("en-IN", {
        maximumFractionDigits: 0
      })}`,
      icon: <FiDollarSign />,
      color: "green"
    },
    {
      title: "Cities",
      value: totalCities,
      icon: <FiMapPin />,
      color: "orange"
    },
    {
      title: "Employee Records",
      value: totalEmployees,
      icon: <FiUserPlus />,
      color: "purple"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome to Employee Management System.</p>
        </div>
      </div>

      {loading && <p>Loading employee data...</p>}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && (
        <>
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
                  Live database data
                </span>
              </div>
            ))}
          </div>

          <div className="employee-section">
            <div className="section-heading">
              <div>
                <h3>Recent Employees</h3>
                <p>Employee records from the database</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Salary</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.length > 0 ? (
                    employees.slice(-5).reverse().map(employee => (
                      <tr key={employee.id}>
                        <td>EMP-{employee.id}</td>

                        <td>
                          {employee.firstname} {employee.lastname}
                        </td>

                        <td>{employee.age}</td>
                        <td>{employee.city}</td>

                        <td>
                          ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        No employee records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
