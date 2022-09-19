/*package com.example.demo2rest.configs;

import com.example.demo2rest.entities.Post;
import com.example.demo2rest.entities.User;
import com.example.demo2rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class EventHandler {
    private final UserRepository userRepository;

    @Autowired
    public EventHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void applyUserInformationUsingSecurityContext(Post post) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.userRepository.findByUsername(name);

        post.setUser(user);
    }
}*/
