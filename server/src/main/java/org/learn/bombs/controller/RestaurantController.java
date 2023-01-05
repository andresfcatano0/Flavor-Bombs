package org.learn.bombs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.RestaurantService;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Restaurant;

import java.util.List;

@RestController
@CrossOrigin( origins = "http://localhost:3000")
@RequestMapping( "/api/restaurant" )
public class RestaurantController {

    @Autowired
    RestaurantService service;

    //getting all public restaurants
    @GetMapping("/public")
    ResponseEntity getPublicRestaurants(){

        Result<List<Restaurant>> publicGetResult = service.getPublicRestaurants();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }


    @DeleteMapping("/{id}")
    ResponseEntity deleteRestaurantById( @PathVariable Integer id ){

        Result deleteResult = service.deleteRestaurantById( id );

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

}
