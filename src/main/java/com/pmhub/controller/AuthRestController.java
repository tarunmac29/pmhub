package com.pmhub.controller;

import com.pmhub.dto.RegisterRequest;
import com.pmhub.dto.LoginRequest;
import com.pmhub.service.AuthService;
import com.pmhub.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/user/details")
    public ResponseEntity<Map<String, String>> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return authService.findByUsername(username)
                .map(user -> {
                    Map<String, String> userDetails = new HashMap<>();
                    userDetails.put("name", user.getUsername());
                    userDetails.put("email", user.getEmail());
                    userDetails.put("avatar", "https://i.pravatar.cc/150?img=56"); // Example avatar
                    return ResponseEntity.ok(userDetails);
                })
                .orElseGet(() -> {
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", "User not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
                });
    }


//    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
//        System.out.println("Username: " + request.getUsername());
//        System.out.println("Email: " + request.getEmail());
//        System.out.println("Password: " + request.getPassword());
//
//        Map<String, String> response = new HashMap<>();
//
//        try {
//            authService.registerUser(
//                    request.getUsername(),
//                    request.getEmail(),
//                    request.getPassword()
//            );
//            response.put("message", "User registered successfully.");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            response.put("message", e.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//    }

//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
//        Map<String, String> response = new HashMap<>();
//
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//            );
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            response.put("message", "Login successful");
//            return ResponseEntity.ok(response);
//        } catch (AuthenticationException e) {
//            response.put("message", "Invalid credentials");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtil.generateToken(request.getUsername());
            response.put("token", token);
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            authService.registerUser(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword()
            );
            // Generate JWT token after successful registration
            String token = jwtUtil.generateToken(request.getUsername());
            response.put("message", "User registered successfully.");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
