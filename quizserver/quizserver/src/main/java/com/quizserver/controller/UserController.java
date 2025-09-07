package com.quizserver.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizserver.entities.User;
import com.quizserver.service.user.UserService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")    
    public ResponseEntity<?> registerUser(@RequestBody User user){
        if(userService.hasUserWithEmail(user.getEmail())){
            return new ResponseEntity<>("User already exists",HttpStatus.NOT_ACCEPTABLE);
        }
        User createUser = userService.createUser(user);
        if(createUser == null){
            return new ResponseEntity<>("Something went wrong",HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(createUser,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User dbUser = userService.login(user);
        if(dbUser == null){
            return new ResponseEntity<>("Invalid Credentials",HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(dbUser,HttpStatus.OK);
    }
}
 