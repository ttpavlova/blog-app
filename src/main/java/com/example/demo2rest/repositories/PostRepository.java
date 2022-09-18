package com.example.demo2rest.repositories;

import com.example.demo2rest.entities.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Integer> {
}
