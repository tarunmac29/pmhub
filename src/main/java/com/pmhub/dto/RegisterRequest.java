package com.pmhub.dto;


public class RegisterRequest {
    private String username;
    private String email;
    private String password;


    public RegisterRequest() {
        // Default constructor is a MUST for JSON deserialization
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }




}
