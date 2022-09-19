package com.example.demo2rest.entities;

import javax.persistence.*;
import java.text.DateFormat;
import java.util.Date;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_post;
    private String name;
    private String text;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    private User username;

    Post() {

    }

    /*Post(String name, String text, Date date, Integer id_user) {
        this.name = name;
        this.text = text;
        this.date = date;
        this.id_user = id_user;
    }*/

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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return username;
    }

    public void setUser(User username) {
        this.username = username;
    }
}
