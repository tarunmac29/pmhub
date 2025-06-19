package com.pmhub.Repository;

import com.pmhub.Entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    List<ProjectEntity> findByNameContainingIgnoreCase(String name);


}
