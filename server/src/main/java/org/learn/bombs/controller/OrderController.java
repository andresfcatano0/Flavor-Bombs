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


    @GetMapping("/all")
    ResponseEntity getAllOrders(){

        Result<List<Order>> publicGetResult = service.getAllOrders();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }

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

    @DeleteMapping("/{id}")
    ResponseEntity deleteOrderById( @PathVariable Integer id ){

        AppUser requestingUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result deleteResult = service.deleteOrderById( id, requestingUser.getUsername() );

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

    @PostMapping
    ResponseEntity addOrder( @RequestBody Order toAdd ){
        AppUser requestingUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<Order> addResult = service.addOrder( toAdd, requestingUser.getUsername() );

        if( addResult.isSuccess() ){
            return new ResponseEntity( addResult.getPayload(), HttpStatus.CREATED);
        }

        return ResponseEntity.badRequest().body( addResult.getErrorMessages() );
    }

    @PutMapping("/{orderId}")
    ResponseEntity update( @PathVariable int orderId, @RequestBody Order order) {
        AppUser requestingUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<Order> updateResult = service.update(order, requestingUser.getUsername());

        if (orderId != order.getOrderId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (updateResult.isSuccess() ){
            return new ResponseEntity( updateResult.getPayload(), HttpStatus.CREATED);
        }

        return ResponseEntity.badRequest().body( updateResult.getErrorMessages() );
    }

}
