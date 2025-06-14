package com.pmhub.Repository;

import com.pmhub.Entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByProject_ProjectId(Long projectId);

    List<TaskEntity> findByNameContainingIgnoreCase(String name);

    List<TaskEntity> findByStatus(String status);

    List<TaskEntity> findByPriority(String priority);

    List<TaskEntity> findByProject_ProjectIdAndStatus(Long projectId, String status);



}
