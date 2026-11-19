package com.springproject01.employeeserviceportal.controller;
import org.springframework.web.bind.annotation.CrossOrigin;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springproject01.employeeserviceportal.entity.EmployeeObject;
import com.springproject01.employeeserviceportal.service.EmployeeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@PostMapping("/createmployee")
	public EmployeeObject createEmployee(@RequestBody EmployeeObject employeeObject ) {
		return employeeService.createEmployee(employeeObject);
	}
	
	@GetMapping("/getallemployees")
	List<EmployeeObject> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	@GetMapping("/getemployeebyid/{id}")
	EmployeeObject getEmployeeByID(@PathVariable("id") Integer id) {
		return employeeService.getEmployeeById(id);
	}
	
	@GetMapping("getemployyebyfirstname/{firstname}")
	EmployeeObject getEmployeeBtFirstName(@PathVariable("firstname") String firstname) {
		return employeeService.getEmployeeByFirstName(firstname);
	}
	
	@PutMapping("/updateemployyebyid/{id}")
	EmployeeObject updateEmployeeById(@RequestBody EmployeeObject employeeObject,@PathVariable("id") Integer id) {
		return employeeService.updateEmployeeeById(employeeObject,id);
	}
	

	@DeleteMapping("/deleteemployyebyid/{id}")
	String deleteEmployeeById(@PathVariable("id") Integer id) {
		employeeService.deleteEmployeeById(id);
		return "Employee Id "+ id +" has been deleted";
	}

}
