package com.pmhub.service;

import com.pmhub.Entity.TaskEntity;

import com.pmhub.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    // Get All tasks
    public List<TaskEntity> getAllTasks() {
        return taskRepository.findAll();
    }


    // Get task by Project ID
    public List<TaskEntity> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProject_ProjectId(projectId);
    }

    // Get task by ID
    public TaskEntity getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }
    // Create or Update task
    public TaskEntity saveTask(TaskEntity task) {
        return taskRepository.save(task);
    }

    // Delete task by ID
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Delete all tasks by Project ID
    public void deleteTasksByProjectId(Long projectId) {
        List<TaskEntity> tasks = taskRepository.findByProject_ProjectId(projectId);
        taskRepository.deleteAll(tasks);
    }

    // Optional: Search tasks by name
    public List<TaskEntity> searchTasksByName(String name) {
        return taskRepository.findByNameContainingIgnoreCase(name);
    }

    // Optional: Get tasks by status
    public List<TaskEntity> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    // Optional: Get tasks by priority
    public List<TaskEntity> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    // Optional: Get tasks by project ID and status
    public List<TaskEntity> getTasksByProjectIdAndStatus(Long projectId, String status) {
        return taskRepository.findByProject_ProjectIdAndStatus(projectId, status);
    }
}
