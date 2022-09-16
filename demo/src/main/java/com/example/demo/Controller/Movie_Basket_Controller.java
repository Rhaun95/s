package com.example.demo.Controller;

import com.example.demo.Service.Movie_Basket_Service;
import com.example.demo.VO.Movie_Basket;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/basket")
public class Movie_Basket_Controller {
    @Autowired
    private Movie_Basket_Service service;

    private int length;
    @CrossOrigin
    @GetMapping("/")
    public List<Movie_Basket> getAll(){

        if(service.getAll() != null){
            return  service.getAll();
        }else{
            System.out.println("영화장바구니 내역 불러오기 실패");
            return null;
        }
    }

    @CrossOrigin
    @GetMapping("/seatsize")
    public int seatLength(){
        ArrayList<Movie_Basket> mb = new ArrayList<>();

        mb.addAll(service.getAll());
        int length=0;
        for(Movie_Basket mm : mb){
            String[] list= mm.getSeat_num().split(",");
            length += list.length;
        }
        System.out.println(length);
        return length;
    }
//    ArrayList<Movie_Basket> mb = new ArrayList<>();
//        System.out.println("성공"+ service.getAll().getClass().getName());
//        System.out.println(service.getAll().size());
//        mb.addAll(service.getAll());
//
//        for (Movie_Basket mm : mb){
//
//        System.out.println("좌석들" + mm.getSeat_num());
//        System.out.println("좌석배열 타입" + mm.getSeat_num().getClass().getName());
//
//        String[] list = mm.getSeat_num().split(",");


    @CrossOrigin
    @PostMapping("/add")
    public int addMVBasket(@RequestBody Movie_Basket mb){
        if(service.addMVBasket(mb) == 1){
            System.out.println("영화 장바구니 추가 성공");
            return 1;
        }else{
            System.out.println("영화 장바구니 추가 실패");
            return 0;
        }
    }
    @CrossOrigin
    @DeleteMapping("/")
    public int deleteAll(){
        if(service.deleteAll() == 0){
            return 0;
        }else{
            return 1;
        }
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public int deleteById(@PathVariable int id){
        if(service.deleteById(id) ==1){ ;
            System.out.println("영화 장바구니에서 삭제 성공");
            return 1;

        }else{
            System.out.println("영화 장바구니에서 삭제 실패");
            return 0; }
    }



}
