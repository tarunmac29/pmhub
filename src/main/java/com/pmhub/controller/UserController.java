package com.pmhub.controller;

import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.UserRepository;
import com.pmhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // GET: /api/users
    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getUsernamesAndEmails() {
        List<UserEntity> users = userService.findAll();

        List<Map<String, String>> result = users.stream().map(user -> {
            Map<String, String> map = new HashMap<>();
            map.put("username", user.getUsername());
            map.put("email", user.getEmail());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/username-email-map")
    public ResponseEntity<List<Map<String, Object>>> getUsernameEmailMap() {
        List<UserEntity> users = userRepository.findAll();

        List<Map<String, Object>> result = users.stream().map(user -> {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", user.getUserId());       // Long value
            map.put("username", user.getUsername());
            map.put("email", user.getEmail());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }



    // GET: /api/users/search?username=abc&email=xyz@example.com
    @GetMapping("/search")
    public UserEntity getByUsernameOrEmail(@RequestParam String username, @RequestParam String email) {
        return userService.findByUsernameOrEmail(username, email);
    }

    // GET: /api/users/usernames
    @GetMapping("/usernames")
    public ResponseEntity<List<String>> getAllUsernames() {
        List<UserEntity> users = userService.findAll();
        List<String> usernames = users.stream()
                .map(UserEntity::getUsername)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usernames);
    }

    // GET: /api/users/emails
    @GetMapping("/emails")
    public ResponseEntity<List<String>> getAllEmails() {
        List<UserEntity> users = userService.findAll();
        List<String> emails = users.stream()
                .map(UserEntity::getEmail)
                .collect(Collectors.toList());
        return ResponseEntity.ok(emails);
    }

}
