package com.pmhub.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pmhub.enums.ProjectAccess;
import com.pmhub.enums.ProjectType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @Column(nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectType projectType = ProjectType.Team_managed;

    @Column(nullable = false)
    private String projectKey;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate startDate;

    private LocalDate endDate;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectAccess access = ProjectAccess.Open;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "userId")
    private UserEntity createdBy;


    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}
