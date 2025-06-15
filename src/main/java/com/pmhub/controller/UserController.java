package com.pmhub.controller;

import com.pmhub.Entity.UserEntity;
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

    @GetMapping("/search-by-username")
    public ResponseEntity<List<Map<String, String>>> searchByUsername(@RequestParam("q") String query) {
        List<UserEntity> allUsers = userService.findAll();

        List<Map<String, String>> filtered = allUsers.stream()
                .filter(user -> user.getUsername().toLowerCase().contains(query.toLowerCase()))
                .map(user -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("username", user.getUsername());
                    map.put("email", user.getEmail());
                    return map;
                }).collect(Collectors.toList());

        return ResponseEntity.ok(filtered);
    }


    // GET: /api/users/search?username=abc&email=xyz@example.com
    @GetMapping("/search")
    public UserEntity getByUsernameOrEmail(@RequestParam String username, @RequestParam String email) {
        return userService.findByUsernameOrEmail(username, email);
    }

}
