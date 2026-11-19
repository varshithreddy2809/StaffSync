
import { useEffect, useState } from "react";
import {
  getAllEmployees,
  getEmployeeByFirstName,
  deleteEmployee
} from "../services/EmployeeService";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadEmployees = async () => {
      try {
        setError("");

        const response = await getAllEmployees();

        if (!ignore) {
          setEmployees(response.data);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);

        if (!ignore) {
          setError("Unable to load employees.");
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

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      fetchEmployees();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getEmployeeByFirstName(search.trim());
      const data = response.data;

      setEmployees(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      console.error("Search error:", err);
      setEmployees([]);
      setError("No matching employee found.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete employee.");
    }
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-heading">
        <div>
          <h2>Employees</h2>
          <p>Manage all employee records</p>
        </div>
        <span className="employee-count">
          Total: {employees.length}
        </span>
      </div>

      <form className="employee-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by first name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>

        <button
          type="button"
          className="reset-search-btn"
          onClick={() => {
            setSearch("");
            fetchEmployees();
          }}
        >
          Reset
        </button>
      </form>

      <div className="employee-table-container">
        {loading ? (
          <p className="employee-message">Loading employees...</p>
        ) : error ? (
          <p className="employee-error">{error}</p>
        ) : employees.length === 0 ? (
          <p className="employee-message">No employees found.</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>City</th>
                <th>Salary</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>EMP-{employee.id}</td>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.age}</td>
                  <td>{employee.city}</td>
                  <td>
                    ₹{Number(employee.salary).toLocaleString("en-IN")}
                  </td>
                  <td>{employee.address}</td>
                  <td>
                    <button
                      className="delete-employee-btn"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
 