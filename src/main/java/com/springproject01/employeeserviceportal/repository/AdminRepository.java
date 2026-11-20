package com.springproject01.employeeserviceportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springproject01.employeeserviceportal.entity.AdminObject;

public interface AdminRepository extends JpaRepository<AdminObject, Integer> {

    Optional<AdminObject> findByEmail(String email);

    boolean existsByEmail(String email);
}