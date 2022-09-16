package com.example.demo.Mapper;

import com.example.demo.VO.ReviewBoard;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewBoardMapper {
    List<ReviewBoard> getAll(); //전체조회

    ReviewBoard getById(@Param("id") int id);//id별 조회



}
