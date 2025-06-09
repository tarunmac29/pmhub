package com.pmhub.Entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "User")
@Getter
@Setter
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Constructor must assign all fields properly:
    public UserEntity(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Default constructor needed by JPA
    public UserEntity() {}

    // Getters and setters
}

