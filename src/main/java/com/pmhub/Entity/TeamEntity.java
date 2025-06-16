package com.pmhub.Entity;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "teams")
public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;

    @Column(nullable = false, unique = true, length = 32)
    private String teamName;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;



    // Additional fields and methods can be added as needed
}
