package com.springproject01.employeeserviceportal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springproject01.employeeserviceportal.dto.AdminRegisterRequest;
import com.springproject01.employeeserviceportal.entity.AdminObject;
import com.springproject01.employeeserviceportal.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(
            AdminService adminService,
            PasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(
            @RequestBody AdminRegisterRequest request) {

        if (adminService.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        AdminObject admin = new AdminObject();

        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));

        adminService.saveAdmin(admin);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Admin registered successfully");
    }
}