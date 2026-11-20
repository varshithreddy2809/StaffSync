package com.springproject01.employeeserviceportal.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.springproject01.employeeserviceportal.entity.AdminObject;
import com.springproject01.employeeserviceportal.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<AdminObject> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }

    public AdminObject saveAdmin(AdminObject admin) {
        return adminRepository.save(admin);
    }
}