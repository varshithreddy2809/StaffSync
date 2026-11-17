package com.springproject01.employeeserviceportal.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="employee")
@Setter
@Getter
public class EmployeeObject {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Integer id;
	String firstname;
	String lastname;
	Integer age;
	Double salary;
	String city;
	String address;
	
}
