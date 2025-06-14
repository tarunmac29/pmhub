package com.pmhub.controller;

import com.pmhub.Entity.TaskEntity;

import com.pmhub.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@Component
public class TaskController {


    // This class will handle task-related endpoints
    // You can implement methods similar to those in ProjectController for tasks
    // For example, createTask, deleteTask, getAllTasks, etc.

    @Autowired
    private TaskService taskService;

     // Create or Update task
     @PostMapping
     public ResponseEntity<TaskEntity> createTask(@RequestBody TaskEntity task) {
         TaskEntity savedTask = taskService.saveTask(task);
         return ResponseEntity.ok(savedTask);
     }

    //Delete task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    // Get all tasks
    @GetMapping
    public ResponseEntity<List<TaskEntity>> getAllTasks() {
        List<TaskEntity> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }


    // Get tasks by Project ID
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskEntity>> getTasksByProjectId(@PathVariable Long projectId) {
        List<TaskEntity> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    // Get task by task_id
    @GetMapping("/{id}")
    public ResponseEntity<TaskEntity> getTaskById(@PathVariable Long id) {
        TaskEntity task = taskService.getTaskById(id);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete all tasks by Project ID
    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<?> deleteTasksByProjectId(@PathVariable Long projectId) {
        taskService.deleteTasksByProjectId(projectId);
        return ResponseEntity.ok().build();
    }


    // Optional: Search tasks by name
    @GetMapping("/search/{name}")
    public ResponseEntity<List<TaskEntity>> searchTasksByName(@PathVariable String name) {
        List<TaskEntity> tasks = taskService.searchTasksByName(name);
        return ResponseEntity.ok(tasks);
    }

    // Optional: Get tasks by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskEntity>> getTasksByStatus(@PathVariable String status) {
        List<TaskEntity> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    // Optional: Get tasks by priority
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<TaskEntity>> getTasksByPriority(@PathVariable String priority) {
        List<TaskEntity> tasks = taskService.getTasksByPriority(priority);
        return ResponseEntity.ok(tasks);
    }

    // Optional: Get tasks by project ID and status
    @GetMapping("/project/{projectId}/status/{status}")
    public ResponseEntity<List<TaskEntity>> getTasksByProjectIdAndStatus(@PathVariable Long projectId, @PathVariable String status) {
        List<TaskEntity> tasks = taskService.getTasksByProjectIdAndStatus(projectId, status);
        return ResponseEntity.ok(tasks);
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<TaskEntity> updateTask(@PathVariable Long id, @RequestBody TaskEntity task) {
        TaskEntity existingTask = taskService.getTaskById(id);
        if (existingTask != null) {
            task.setTaskId(id);
            TaskEntity updatedTask = taskService.saveTask(task);
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
