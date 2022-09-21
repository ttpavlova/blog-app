package com.example.demo2rest.repositories;

import com.example.demo2rest.entities.TheUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<TheUser, String> {
    TheUser findByUsername(String username);
}
