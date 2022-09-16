package com.example.demo.Service;

import com.example.demo.Mapper.ReviewBoardMapper;
import com.example.demo.VO.ReviewBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewBoardService {
    @Autowired
    private ReviewBoardMapper ReviewBoardMapper;


    public List<ReviewBoard> getAll(){
        return ReviewBoardMapper.getAll();
    }

    public ReviewBoard getById(int id){
        return ReviewBoardMapper.getById(id);
    }



}
