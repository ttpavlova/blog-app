package com.example.demo2rest.entities;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_authority;*/
    private String username;
    @Id
    private String authority;

    Authority() {

    }

    Authority(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
