package com.example.demo2rest.entities;

import javax.persistence.*;
import java.text.DateFormat;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_post;
    private String name;
    private String text;
    private DateFormat date;
    private Integer id_user;

    Post() {

    }

    Post(String name, String text, DateFormat date, Integer id_user) {
        this.name = name;
        this.text = text;
        this.date = date;
        this.id_user = id_user;
    }

    public Integer getId_post() {
        return id_post;
    }

    public void setId_post(Integer id_post) {
        this.id_post = id_post;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public DateFormat getDate() {
        return date;
    }

    public void setDate(DateFormat date) {
        this.date = date;
    }

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }
}
