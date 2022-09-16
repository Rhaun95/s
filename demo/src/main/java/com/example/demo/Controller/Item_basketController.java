package com.example.demo.Controller;

import com.example.demo.Service.Item_basketService;
import com.example.demo.VO.Item_basket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/itembasket")
public class Item_basketController {

        @Autowired
        private Item_basketService itembasketService;


        @GetMapping("") // 전체 조회
        public List<Item_basket> getAll() {
//            System.out.println(itembasketService.getAll());
            return itembasketService.getAll();
        }


//        @GetMapping("/{id}")
//        public Seat getById(@PathVariable("id") int id) {
//            return itembasketService.getId(id);
//        }

        @PostMapping("/insert") // 추가
        public Item_basket post(@RequestBody Item_basket item_basket) {
            itembasketService.insert(item_basket);
            return item_basket;
        }

        @DeleteMapping("/")
        public int deleteAll(){
            if(itembasketService.deleteAll() != 0){
                return 1;
            }else{
                return 0;
            }
        }

        @DeleteMapping("/{id}")
        public int deleteById(@PathVariable("id") int id) {
            return itembasketService.deleteById(id);
        }

//        @PutMapping("/{id}")
//        public String update(@PathVariable("id") int id, @RequestBody Seat store) {
//            itembasketService.update(id, store);
//            return id + "번 제품 수정되었습니다." + LocalTime.now();
//        }

}
