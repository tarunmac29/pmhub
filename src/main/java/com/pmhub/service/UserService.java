package com.pmhub.service;

import com.pmhub.Entity.UserEntity;
import com.pmhub.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserEntity registerUser(String username, String email, String  password) throws Exception{
        if (userRepository.existsByUsername(username)){
            throw new Exception("User Name Already Exist");
        }

        if (userRepository.existsByEmail(email)){
            throw new Exception("User Email Alredy Exist");
        }

        String encodedPassword = passwordEncoder.encode(password);
        UserEntity User = new UserEntity(username,email,encodedPassword);
        return userRepository.save(User);
    }

    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
