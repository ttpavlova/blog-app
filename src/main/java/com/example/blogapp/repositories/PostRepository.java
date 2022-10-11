package com.example.blogapp.repositories;

import com.example.blogapp.entities.Post;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_USER')")
public interface PostRepository extends PagingAndSortingRepository<Post, Integer> {
    @Override
    @PreAuthorize("#post?.user?.username == authentication?.principal.username || hasRole('ROLE_ADMIN')")
    Post save(@Param("post") Post post);

    /*@Override
    @PreAuthorize("@postRepository.findById(#id)?.user?.username == authentication?.principal.username")
    void deleteById(@Param("id") Integer id);

    @Override
    @PreAuthorize("#post?.user?.username == authentication?.principal.username")
    void delete(@Param("post") Post post);*/
}
