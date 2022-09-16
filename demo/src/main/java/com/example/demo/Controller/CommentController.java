package com.example.demo.Controller;

import com.example.demo.Service.CommentService;
import com.example.demo.VO.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Co")
public class CommentController {

    @Autowired
    private CommentService commentService;


    @CrossOrigin
    @GetMapping("/comment")
    public List<Comment> getAll() {
        return commentService.getAll();
    }


    //문의글 답변 하나 조회하기
    @CrossOrigin
    @GetMapping("/comment/{id}")
    public Comment get(@PathVariable("id") int id) {

        return commentService.getById(id);

    }

    //문의글 답변 추가
    @CrossOrigin
    @PostMapping("/comment")
    public int addComment(@RequestBody Comment comment) {
        if (commentService.insert(comment) == 1) {
            System.out.println("댓글추가성공");
            return 1;
        } else {
            System.out.println("오류발생");
            return  0;
        }

    }


    //문의글 답변 수정


    //문의글 답변 삭제



}

