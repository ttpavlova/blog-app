package com.example.demo2rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@JsonIgnoreProperties(value = {"password", "enabled"})
public class TheUser {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;
    private String first_name;
    private String last_name;*/
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    private String username;

    private  String password;

    private Boolean enabled;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "username")
    private List<Post> posts;

    // constructor
    TheUser() {}

    public TheUser(String username, String password, Boolean enabled) {
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
        this.password = PASSWORD_ENCODER.encode(password);
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
