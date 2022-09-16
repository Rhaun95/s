package com.example.demo.Controller;

import com.example.demo.Service.BoardService;
import com.example.demo.VO.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Bo")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @CrossOrigin
    @GetMapping("/board")
    public List<Board> getAll() {
        return boardService.getAll();
    }

    @CrossOrigin
    @GetMapping( "/board/{id}")
    public Board get(@PathVariable("id") int id) {

        return boardService.getById(id);

    }

    @CrossOrigin
    @PostMapping("/board")
    public int add(@RequestBody Board board) {
        if (boardService.insert(board) == 1) {
            System.out.println("성공");
            return 1;
        } else {
            System.out.println("오류발생");
            return 0;
        }

    }


    @CrossOrigin
    @DeleteMapping("/board/{id}")
    public String delete(@PathVariable int id) {

        if (boardService.delete(id) != 0) {
            System.out.println("성공");
            return "성공";
        } else {
            System.out.println("오류발생");
            return "오류발생";
        }
    }

    @CrossOrigin
    @PutMapping("/board/{id}")
    public int put(@PathVariable int id, @RequestBody Board board) {

        if (boardService.update(id, board) != 0) {
            System.out.println("수정 성공");
            return boardService.update(id, board);  //res
        } else {
            System.out.println("수정오류발생");
            return boardService.update(id, board);
        }
    }

    @CrossOrigin
    @PutMapping("/board/addHit/{id}")
    public int addHit(@PathVariable int id,@RequestBody Board board) {
        int result = boardService.addHit(id, board);
        if (result == 1) {
            System.out.println("조회수 추가 성공");
            return result;
        } else {
            System.out.println("조회수 실패");
            return 0;
        }

    }
}
