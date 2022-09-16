package com.example.demo.Mapper;

import com.example.demo.entity.User2;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
    public interface UserMapper {
        List<User2> getAllUser();

        User2 getById(@Param("id")String id);
}
