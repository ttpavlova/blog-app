package com.example.demo2rest.entities;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id_authority;
    private String name;

    Authority() {

    }

    Authority(String name) {
        this.name = name;
    }

    public Integer getId_authority() {
        return id_authority;
    }

    public void setId_authority(Integer id_authority) {
        this.id_authority = id_authority;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
