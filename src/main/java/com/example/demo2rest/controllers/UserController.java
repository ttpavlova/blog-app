package com.example.demo2rest.controllers;

import com.example.demo2rest.entities.User;
import com.example.demo2rest.repositories.UserRepository;
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

    @GetMapping(path = "/username")
    @ResponseBody
    User getCurrentUsername(Principal principal) {
        String currentUsername = principal.getName();
        return userRepository.findByUsername(currentUsername);
    }
}
