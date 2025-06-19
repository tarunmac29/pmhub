package com.pmhub.service;

import com.pmhub.Entity.TaskEntity;

import com.pmhub.Entity.TeamEntity;
import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.TaskRepository;
import com.pmhub.Repository.TeamRepository;
import com.pmhub.Repository.UserRepository;
import com.pmhub.enums.Status;
import com.pmhub.enums.TaskStatus;
import com.pmhub.enums.TaskType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    // Get All tasks
    public List<TaskEntity> getAllTasks() {
        return taskRepository.findAll();
    }


    // Get task by Project ID
    public List<TaskEntity> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProject_ProjectId(projectId);
    }

    public TaskEntity updatePartial(Long id, Map<String, Object> updates) {
        TaskEntity task = taskRepository.findById(id).orElseThrow();

        // Handle type
        if (updates.containsKey("type")) {
            String typeStr = (String) updates.get("type");
            task.setType(TaskType.valueOf(typeStr));
        }

        // Handle summary
        if (updates.containsKey("summary")) {
            task.setSummary((String) updates.get("summary"));
        }

        // Handle status
        if (updates.containsKey("status")) {
            String statusStr = (String) updates.get("status");
            task.setStatus(TaskStatus.valueOf(statusStr));
        }

        // ✅ Handle teamId (flat structure)
        if (updates.containsKey("teamId")) {
            Object rawTeamId = updates.get("teamId");
            Long teamId = rawTeamId instanceof Number
                    ? ((Number) rawTeamId).longValue()
                    : Long.parseLong(String.valueOf(rawTeamId));
            TeamEntity team = teamRepository.findById(teamId).orElseThrow();
            task.setTeam(team); // ✅ this line was missing
        }

        // ✅ Handle nested team: { team: { teamId: 5 } }
        if (updates.containsKey("team")) {
            Map<String, Object> teamMap = (Map<String, Object>) updates.get("team");
            if (teamMap != null) {
                Object rawTeamId = teamMap.get("teamId");
                Long teamId = rawTeamId instanceof Number
                        ? ((Number) rawTeamId).longValue()
                        : Long.parseLong(String.valueOf(rawTeamId));
                TeamEntity team = teamRepository.findById(teamId).orElseThrow();
                task.setTeam(team); // ✅ this line was missing
            }
        }

        // ✅ Handle assigneeId
        if (updates.containsKey("assigneeId")) {
            Object rawUserId = updates.get("assigneeId");
            Long userId = rawUserId instanceof Number
                    ? ((Number) rawUserId).longValue()
                    : Long.parseLong(String.valueOf(rawUserId));
            UserEntity user = userRepository.findById(userId).orElseThrow();
            task.setAssignee(user); // ✅ this line was correct
        }

        // ✅ Handle assignee: { assignee: { userId: 3 } }
        if (updates.containsKey("assignee")) {
            Map<String, Object> assigneeMap = (Map<String, Object>) updates.get("assignee");
            if (assigneeMap != null) {
                Object rawUserId = assigneeMap.get("userId");
                Long userId = rawUserId instanceof Number
                        ? ((Number) rawUserId).longValue()
                        : Long.parseLong(String.valueOf(rawUserId));
                UserEntity user = userRepository.findById(userId).orElseThrow();
                task.setAssignee(user); // ✅ this line was missing
            }
        }

        return taskRepository.save(task); // ✅ final save
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
