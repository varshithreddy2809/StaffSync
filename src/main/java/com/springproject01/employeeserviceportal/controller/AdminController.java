
package com.springproject01.employeeserviceportal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.springproject01.employeeserviceportal.dto.AdminLoginRequest;
import com.springproject01.employeeserviceportal.dto.AdminRegisterRequest;
import com.springproject01.employeeserviceportal.entity.AdminObject;
import com.springproject01.employeeserviceportal.service.AdminService;
import com.springproject01.employeeserviceportal.service.JwtService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final AdminService adminService;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AdminController(AdminService adminService, PasswordEncoder passwordEncoder, JwtService jwtService) {

		this.adminService = adminService;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerAdmin(@RequestBody AdminRegisterRequest request) {

		if (adminService.existsByEmail(request.getEmail())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
		}

		AdminObject admin = new AdminObject();

		admin.setName(request.getName());
		admin.setEmail(request.getEmail());
		admin.setPassword(passwordEncoder.encode(request.getPassword()));

		adminService.saveAdmin(admin);

		return ResponseEntity.status(HttpStatus.CREATED).body("Admin registered successfully");
	}

	@PostMapping("/login")
	public ResponseEntity<String> loginAdmin(@RequestBody AdminLoginRequest request) {

		AdminObject admin = adminService.findByEmail(request.getEmail()).orElse(null);

		if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}

		String token = jwtService.generateToken(admin.getEmail());

		return ResponseEntity.ok(token);
	}
}
