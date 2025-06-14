package com.pmhub.Repository;

import com.pmhub.Entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    List<ProjectEntity> findByNameContainingIgnoreCase(String name);

    List<ProjectEntity> findByTenant_TenantId(Long tenantId);

    List<ProjectEntity> findByTenant_TenantIdAndNameContainingIgnoreCase(Long tenantId, String name);

    List<ProjectEntity> findByCreatedBy_UserId(Long userId);




}
