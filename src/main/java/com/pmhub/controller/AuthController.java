package com.pmhub.controller;


import com.pmhub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/register")
    public String showRegistrationForm(){
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String username,
                               @RequestParam String email,
                               @RequestParam String password) {
        try {
            authService.registerUser(username, email, password);
            return "User registered successfully. Please login.";
        } catch (Exception e) {
            return "Registration failed: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String username,
                            @RequestParam String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            return "Login successful!";
        } catch (Exception e) {
            return "Invalid credentials";
        }
    }



    @GetMapping("/login")
    public String showLoginForm() {
        return "login";  // Return the name of the login HTML page
    }
}
