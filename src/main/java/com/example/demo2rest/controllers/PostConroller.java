package com.example.demo2rest.controllers;

import com.example.demo2rest.entities.Post;
import com.example.demo2rest.entities.User;
import com.example.demo2rest.exceptions.PostNotFoundException;
import com.example.demo2rest.repositories.PostRepository;
import com.example.demo2rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
    public @ResponseBody Iterable<Post> getAllPosts() {
        // return a JSON or XML with the posts
        return postRepository.findAll();
    }

    @PostMapping(path = "/posts")
    public Post newPost(@RequestBody Post newPost, Principal principal) {
        String currentUsername = principal.getName();
        User user = userRepository.findByUsername(currentUsername);
        newPost.setUser(user);
        return postRepository.save(newPost);
    }

    /*@PostMapping(path = "/posts")
    public Post newPost(@RequestBody Post newPost) {
        return postRepository.save(newPost);
    }*/

    @GetMapping(path = "/posts/{id}")
    EntityModel<Post> one(@PathVariable Integer id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        return EntityModel.of(post,
                linkTo(methodOn(PostConroller.class).one(id)).withSelfRel());
    }

    @PutMapping(path = "/posts/{id}")
    Post replacePost(@RequestBody Post newPost, @PathVariable Integer id) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setName(newPost.getName());
                    post.setText(newPost.getText());
                    return postRepository.save(post);
                })
                .orElseGet(() -> {
                    newPost.setId(id);
                    return postRepository.save(newPost);
                });
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