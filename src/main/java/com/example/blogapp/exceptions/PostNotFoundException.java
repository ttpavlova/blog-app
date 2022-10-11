package com.example.blogapp.exceptions;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Integer id) { super("Could not find a post " + id); }
}
