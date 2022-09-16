package com.example.demo.Controller;

import com.example.demo.VO.UserDto;
import com.example.demo.entity.Authority2;
import com.example.demo.entity.User;
import com.example.demo.entity.User2;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService2;
    private  UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // UserDto를 파라미터로 받아서 UserService의 signup 메소드를 호출
    @PostMapping("/signup")
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    // PreAuthorize -> 권한 허용(USER, ADMIN)
    @GetMapping("/user")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());
    }

    // PreAuthorize -> 권한 허용(ADMIN)
    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getMyUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());
    }
    @GetMapping("/te")
    public ResponseEntity<User> getMyUserInfo2() {
        return ResponseEntity.ok(userService.getUserWithAuthorities().get());

    }
    @GetMapping("/test")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public List<Authority2> getAll() {
        return userService2.getAll();
    }


    @GetMapping("abc")
    public List<User2> getAllUser() {
        return userService2.getAllUser();
    }

    @GetMapping("/{id}")
    public User2 getById(@PathVariable String id) {
        return userService2.getById(id);
    }


}
//    @GetMapping("/te")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")
//    public List<Authority2> getAll(){
//        return userService2.getAll();
////    }
//}
