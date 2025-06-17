package com.pmhub.service;

import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Add methods to interact with the UserRepository as needed

    public UserEntity findByUsernameOrEmail(String username, String email) {
        return userRepository.findByUsernameOrEmail(username, email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

}
