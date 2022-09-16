package com.example.demo.Service;

import com.example.demo.Mapper.Movie_Basket_Mapper;
import com.example.demo.VO.Movie_Basket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Movie_Basket_Service {
    @Autowired
    private Movie_Basket_Mapper mapper;


    public List<Movie_Basket> getAll(){
        return mapper.getAll();
    }
    public int addMVBasket(Movie_Basket movie_basket){
        return mapper.addMVBasket(movie_basket);
    }


    public int deleteAll(){
        return mapper.deleteAll();
    }
    public int deleteById(int id){
        return mapper.deleteById(id);
    }

}
