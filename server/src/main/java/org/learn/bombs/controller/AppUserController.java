package org.learn.bombs.controller;

import org.learn.bombs.models.Order;
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

    @DeleteMapping("/{id}")
    ResponseEntity deleteAppUserById( @PathVariable Integer id ){

        Result deleteResult = service.deleteAppUserById( id );

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

    @PutMapping("/{appUserId}")
    ResponseEntity update( @PathVariable int appUserId, @RequestBody AppUser appUser) {

        Result<AppUser> updateResult = service.update(appUser);

        if (appUserId != appUser.getAppUserId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (updateResult.isSuccess() ){
            return new ResponseEntity( updateResult.getPayload(), HttpStatus.CREATED);
        }

        return ResponseEntity.badRequest().body( updateResult.getErrorMessages() );
    }

}
