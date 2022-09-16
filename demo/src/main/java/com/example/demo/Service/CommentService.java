package com.example.demo.Service;

import com.example.demo.Mapper.CommentMapper;
import com.example.demo.VO.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentMapper commentMapper;

    public List<Comment> getAll() {
        return commentMapper.getAll();
    }

    //댓글 하나 조회
    public Comment getById(int id) {

        return commentMapper.getById(id);
    }

    //댓글 추가
    public int insert(Comment comment) {
        return commentMapper.insert(comment);
    }
}
