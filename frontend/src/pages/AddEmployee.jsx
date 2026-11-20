
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/EmployeeService";
import "./AddEmployee.css";

function AddEmployee() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        age: "",
        salary: "",
        city: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployee((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !employee.firstname.trim() ||
            !employee.lastname.trim() ||
            !employee.age ||
            !employee.salary ||
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
            setLoading(true);

            await createEmployee({
                ...employee,
                age: Number(employee.age),
                salary: Number(employee.salary)
            });

            alert("Employee added successfully!");
            navigate("/employees");
        } catch (err) {
            console.error("Create employee error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to add employee. Please check the backend."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-employee-page">
            <div className="add-employee-heading">
                <h2>Add Employee</h2>
                <p>Enter the employee details below.</p>
            </div>

            <form
                className="add-employee-form"
                onSubmit={handleSubmit}
            >
                <div className="add-employee-grid">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={employee.firstname}
                            onChange={handleChange}
                            placeholder="Enter first name"
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
                            placeholder="Enter last name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={employee.age}
                            onChange={handleChange}
                            placeholder="Enter age"
                            min="1"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            min="0"
                            step="0.01"
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
                            placeholder="Enter city"
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
                            placeholder="Enter address"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <p className="add-employee-error">{error}</p>
                )}

                <div className="add-employee-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="submit-employee-btn"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Add Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
