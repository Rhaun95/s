package com.example.demo.Controller;

import com.example.demo.Service.ReviewBoardService;
import com.example.demo.VO.ReviewBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/RB")
public class ReviewBoardController {

    @Autowired
    private ReviewBoardService  reviewBoardService;

    @CrossOrigin
    @GetMapping("/reviewBoard")
    public List<ReviewBoard> getReview(){
        return reviewBoardService.getAll();
    }

    @CrossOrigin
    @GetMapping("/reviewBoard/{id}")
    public ReviewBoard get (@PathVariable("id") int id) {
        return reviewBoardService.getById(id);
    }





}
