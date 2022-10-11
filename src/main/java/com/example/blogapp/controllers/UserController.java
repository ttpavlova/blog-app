package com.example.blogapp.controllers;

import com.example.blogapp.entities.User;
import com.example.blogapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(path = "/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/user")
    @ResponseBody
    User getCurrentUser(Principal principal) {
        String currentUsername = principal.getName();
        return userRepository.findByUsername(currentUsername);
    }

    public String getCurrentUsername(Principal principal) {
        String currentUsername = principal.getName();
        return currentUsername;
    }
}
