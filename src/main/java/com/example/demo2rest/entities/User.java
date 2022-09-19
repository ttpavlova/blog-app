package com.example.demo2rest.entities;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;
    private String first_name;
    private String last_name;*/
    @Id
    private String username;
    private String password;
    /*private Integer id_authority;*/
    private Boolean enabled;

    // constructor
    User() {}

    User(String username, String password, Boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
