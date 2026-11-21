
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1";

const employeeAPI = axios.create({
    baseURL: BASE_URL
});

employeeAPI.interceptors.request.use(
    (config) => {

        const token = sessionStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllEmployees = () => {
    return employeeAPI.get("/getallemployees");
};

export const getEmployeeById = (id) => {
    return employeeAPI.get(`/getemployeebyid/${id}`);
};

export const createEmployee = (employee) => {
    return employeeAPI.post("/createmployee", employee);
};

export const updateEmployee = (id, employee) => {
    return employeeAPI.put(`/updateemployyebyid/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return employeeAPI.delete(`/deleteemployyebyid/${id}`);
};

export const getEmployeeByFirstName = (firstname) => {
    return employeeAPI.get(
        `/getemployyebyfirstname/${encodeURIComponent(firstname)}`
    );
};
