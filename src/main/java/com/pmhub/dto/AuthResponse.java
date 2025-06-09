package com.pmhub.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {
    private String message;
    private String username;

    public AuthResponse(String message, String username) {
        this.message = message;
        this.username = username;
    }

    // getters and setters
}
