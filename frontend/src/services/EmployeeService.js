
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1";

// Get all employees
export const getAllEmployees = () => {
    return axios.get(`${BASE_URL}/getallemployees`);
};

// Get employee by ID
export const getEmployeeById = (id) => {
    return axios.get(`${BASE_URL}/getemployeebyid/${id}`);
};

// Create employee
export const createEmployee = (employee) => {
    return axios.post(`${BASE_URL}/createmployee`, employee);
};

// Update employee
export const updateEmployee = (id, employee) => {
    return axios.put(`${BASE_URL}/updateemployyebyid/${id}`, employee);
};

// Delete employee
export const deleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/deleteemployyebyid/${id}`);
};

// Search employee by first name
export const getEmployeeByFirstName = (firstname) => {
    return axios.get(
        `${BASE_URL}/getemployyebyfirstname/${encodeURIComponent(firstname)}`
    );
};
