package org.learn.bombs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.OrderService;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Order;

import java.util.List;

@RestController
@CrossOrigin( origins = "http://localhost:3000")
@RequestMapping( "/api/order" )
public class OrderController {

    @Autowired
    OrderService service;

    @GetMapping
    ResponseEntity getPersonalOrders(){

        AppUser currentUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = currentUser.getUsername();

//        String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<List<Order>> lookupResult = service.getPrivateOrdersByUsername( username );

        if(lookupResult.isSuccess()) {
            return ResponseEntity.ok( lookupResult.getPayload() );
        }

        return ResponseEntity.badRequest().body(lookupResult.getErrorMessages());
    }

}
