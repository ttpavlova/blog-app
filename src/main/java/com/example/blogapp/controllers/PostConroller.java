package com.example.blogapp.controllers;

import com.example.blogapp.entities.Post;
import com.example.blogapp.entities.User;
import com.example.blogapp.exceptions.PostNotFoundException;
import com.example.blogapp.repositories.PostRepository;
import com.example.blogapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping(path = "/api")
public class PostConroller {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/posts")
    CollectionModel<EntityModel<Post>> getAllPosts() {

        List<EntityModel<Post>> posts = postRepository.findAll().stream()
                .map(post -> EntityModel.of(post,
                        linkTo(methodOn(PostConroller.class).getOnePost(post.getId())).withSelfRel(),
                        linkTo(methodOn(PostConroller.class).getAllPosts()).withRel("posts")))
                .collect(Collectors.toList());

        return CollectionModel.of(posts, linkTo(methodOn(PostConroller.class).getAllPosts()).withSelfRel());
    }

    @PostMapping(path = "/posts")
    public Post newPost(@RequestBody Post newPost, Principal principal) {
        String currentUsername = principal.getName();
        User user = userRepository.findByUsername(currentUsername);
        newPost.setUser(user);
        return postRepository.save(newPost);
    }

    @GetMapping(path = "/posts/{id}")
    EntityModel<Post> getOnePost(@PathVariable Integer id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        return EntityModel.of(post,
                linkTo(methodOn(PostConroller.class).getOnePost(id)).withSelfRel(),
                linkTo(methodOn(PostConroller.class).getAllPosts()).withRel("posts"));
    }

    @PutMapping(path = "/posts/{id}")
    Post replacePost(@RequestBody Post newPost, @PathVariable Integer id) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(newPost.getTitle());
                    post.setText(newPost.getText());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new PostNotFoundException(id));
    }

    @DeleteMapping(path = "/posts/{id}")
    void deletePost(@PathVariable Integer id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
        } else {
            throw new PostNotFoundException(id);
        }
    }
}