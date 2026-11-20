
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee
} from "../services/EmployeeService";
import "./EditEmployee.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    age: "",
    salary: "",
    city: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch employee details by ID
  useEffect(() => {
    let ignore = false;

    const loadEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        const data = response.data;

        if (!ignore) {
          setEmployee({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            age: data.age ?? "",
            salary: data.salary ?? "",
            city: data.city || "",
            address: data.address || ""
          });
        }
      } catch (err) {
        console.error("Error fetching employee:", err);

        if (!ignore) {
          setError("Unable to load employee details.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadEmployee();

    return () => {
      ignore = true;
    };
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !employee.firstname.trim() ||
      !employee.lastname.trim() ||
      !employee.age ||
      employee.salary === "" ||
      !employee.city.trim() ||
      !employee.address.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (
      Number(employee.age) <= 0 ||
      Number(employee.salary) < 0
    ) {
      setError("Please enter a valid age and salary.");
      return;
    }

    try {
      setUpdating(true);

      const updatedEmployee = {
        ...employee,
        age: Number(employee.age),
        salary: Number(employee.salary)
      };

      await updateEmployee(id, updatedEmployee);

      alert("Employee updated successfully!");

      navigate("/employees");
    } catch (err) {
      console.error("Update error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to update employee. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-employee-page">
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (error && !employee.firstname) {
    return (
      <div className="edit-employee-page">
        <p className="edit-employee-error">{error}</p>

        <button onClick={() => navigate("/employees")}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="edit-employee-page">

      <div className="edit-employee-heading">
        <h2>Edit Employee</h2>
        <p>Update employee information</p>
      </div>

      <form
        className="edit-employee-form"
        onSubmit={handleSubmit}
      >

        <div className="edit-employee-grid">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={employee.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={employee.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              min="1"
              value={employee.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              min="0"
              step="0.01"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={employee.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={employee.address}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        {error && (
          <p className="edit-employee-error">
            {error}
          </p>
        )}

        <div className="edit-employee-actions">

          <button
            type="button"
            className="cancel-edit-btn"
            onClick={() => navigate("/employees")}
            disabled={updating}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-edit-btn"
            disabled={updating}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditEmployee;
