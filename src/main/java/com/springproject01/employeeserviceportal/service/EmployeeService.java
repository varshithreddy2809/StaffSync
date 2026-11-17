package com.springproject01.employeeserviceportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springproject01.employeeserviceportal.entity.EmployeeObject;
import com.springproject01.employeeserviceportal.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;

	public EmployeeObject createEmployee(EmployeeObject employeeObject) {
		return employeeRepository.save(employeeObject);
	}

	public List<EmployeeObject> getAllEmployees() {
		return employeeRepository.findAll();
	}

	public EmployeeObject getEmployeeById(Integer id) {
		return employeeRepository.findById(id).orElseThrow();
	}

	public EmployeeObject getEmployeeByFirstName(String firstname) {
		return employeeRepository.getEmployeeByFirstname(firstname);	

	}

	public EmployeeObject updateEmployeeeById(EmployeeObject employeeObject, Integer id) {
		
		EmployeeObject employeeBeforeUpdate = getEmployeeById(id);
		
		employeeBeforeUpdate.setAge(employeeObject.getAge());
		employeeBeforeUpdate.setAddress(employeeObject.getAddress());
		employeeBeforeUpdate.setCity(employeeObject.getCity());
		employeeBeforeUpdate.setFirstname(employeeObject.getFirstname());
		employeeBeforeUpdate.setLastname(employeeObject.getLastname());
		employeeBeforeUpdate.setSalary(employeeObject.getSalary());
		
		
		return employeeRepository.save(employeeBeforeUpdate) ;
	}

	public String deleteEmployeeById(Integer id) {
		employeeRepository.deleteById(id);
		return null;
	}
}
