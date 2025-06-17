package com.pmhub.Repository;

import com.pmhub.Entity.PeopleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PeopleRepository extends JpaRepository<PeopleEntity, Long> {
    List<PeopleEntity> findByAssignedProject_ProjectId(Long projectId);
}

