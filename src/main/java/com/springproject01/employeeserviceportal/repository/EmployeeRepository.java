package com.springproject01.employeeserviceportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springproject01.employeeserviceportal.entity.EmployeeObject;

public interface EmployeeRepository extends JpaRepository<EmployeeObject, Integer>{

	public abstract EmployeeObject getEmployeeByFirstname(String firstname);
}
