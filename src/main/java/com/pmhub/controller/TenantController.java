package com.pmhub.controller;

import com.pmhub.Entity.Tenant;
import com.pmhub.Repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {
    @Autowired
    private TenantRepository tenantRepository;

    @PostMapping
    public ResponseEntity<Tenant> createTenant(@RequestBody Tenant tenant) {
        Tenant savedTenant = tenantRepository.save(tenant);
        return ResponseEntity.ok(savedTenant);
    }

    @GetMapping
    public ResponseEntity<List<Tenant>> getAllTenants() {
        return ResponseEntity.ok(tenantRepository.findAll());
    }
}

