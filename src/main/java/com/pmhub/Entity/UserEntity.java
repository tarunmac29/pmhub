package com.pmhub.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "User")
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Assuming you have a role field for user roles

    @Column(nullable = false)
    private String createdAt; // Assuming you have a field to track when the user was created

    @Column(nullable = false)
    private String updatedAt; // Assuming you have a field to track when the user was last updated

    @Column(nullable = false)
    private boolean active; // Assuming you have a field to track if the user is active or not


    public UserEntity(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = "USER"; // Default role
        this.createdAt = java.time.LocalDateTime.now().toString(); // Set current time as createdAt
        this.updatedAt = java.time.LocalDateTime.now().toString(); // Set current time as updatedAt
        this.active = true; // Default active status
    }


    // Default constructor needed by JPA
    public UserEntity() {}

    // Getters and setters
}

