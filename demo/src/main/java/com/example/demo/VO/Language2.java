package com.example.demo.VO;

import java.util.Date;


import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "language")
public class Language2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int language_id;

    @Column(name = "name")
    private String name;

    @Column(name = "last_update")
    private String last_update;
}