package com.example.demo2rest.repositories;

import com.example.demo2rest.entities.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_USER')")
public interface PostRepository extends CrudRepository<Post, Integer> {
    @Override
    @PreAuthorize("#post?.user?.username == authentication?.name")
    Post save(@Param("post") Post post);

    @Override
    @PreAuthorize("@postRepository.findById(#id_post)?.user?.username == authentication?.name")
    void deleteById(@Param("id_post") Integer id);

    @Override
    @PreAuthorize("#post?.user?.name == authentication?.name")
    void delete(@Param("post") Post post);
}
