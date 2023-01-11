package org.learn.bombs.controller;

import org.learn.bombs.models.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.AppUserService;
import org.learn.bombs.models.AppUser;

import java.util.List;

@RestController
@CrossOrigin( origins = "http://localhost:3000")
@RequestMapping( "/api/user" )
public class AppUserController {

    @Autowired
    AppUserService service;

    //getting all users
    @GetMapping
    ResponseEntity getAllAppUser(){

        Result<List<AppUser>> publicGetResult = service.getAllAppUser();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }

    @GetMapping("/{id}")
    ResponseEntity getAppUserById( @PathVariable Integer id ){
        Result<AppUser> getResult = service.getAppUserById( id );
        if(getResult.isSuccess()){
            return ResponseEntity.ok(getResult.getPayload());
        }
        return ResponseEntity.notFound().build();
    }

}
