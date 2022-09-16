package com.example.demo.Mapper;


import com.example.demo.VO.Movie_Basket;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface Movie_Basket_Mapper {

        List<Movie_Basket> getAll();//전체조회
//
//        Language getId(@Param("id") int id);//id별 조회

        int addMVBasket(@Param("movie_basket") Movie_Basket movie_basket);//추가

        int deleteById(@Param("id") int id);//삭제
        int deleteAll();
//
//        int updateTest(@Param("id") int id, @Param("language") Language language);//업데이트
//

}

