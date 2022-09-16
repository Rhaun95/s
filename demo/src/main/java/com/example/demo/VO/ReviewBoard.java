package com.example.demo.VO;

import lombok.Data;

@Data
public class ReviewBoard {
    private int id;
    private String user_id;
    private String title;
    private String content;
    private String regDate;
    private int hit;
    private String type;
    private String url;
    private String cinema_name;
    private int star;
    private String cinema_image;
}
