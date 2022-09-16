package com.example.demo.Mapper;

import com.example.demo.VO.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> getAll();//전체조회

   Comment getById(@Param("id") int id);//id별 조회

    int insert( @Param("comment") Comment comment);

/*
    int insert(@Param("board") Comment comment);//추가

    int delete(@Param("id") int id) ;//삭제

    int update(@Param("id") int id,@Param("comment") Comment comment);//업데이트
*/

}