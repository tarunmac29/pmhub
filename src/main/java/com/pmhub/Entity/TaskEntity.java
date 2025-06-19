package com.pmhub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pmhub.enums.TaskPriority;
import com.pmhub.enums.TaskStatus;
import com.pmhub.enums.TaskType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    // Type: TASK, EPIC, STORY, BUG
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskType type = TaskType.Task;

    // Summary/title of the task
    @Column(length = 255, nullable = false)
    private String summary;

    // Detailed description
    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private TeamEntity Team;


    // Task Priority: LOW, MEDIUM, HIGH
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriority priority = TaskPriority.Medium;

    // Task Status: TO_DO, IN_PROGRESS, DONE
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status = TaskStatus.To_Do;

    // Assignee
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    private UserEntity assignee;

    // Task completion flag
    @Column(nullable = false)
    private Boolean completed = false;

    // Due date
    private LocalDate dueDate;

    // Created timestamp
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
