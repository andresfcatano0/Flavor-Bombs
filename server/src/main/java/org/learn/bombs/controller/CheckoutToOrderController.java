package org.learn.bombs.controller;

import org.learn.bombs.domain.CheckoutOrderService;
import org.learn.bombs.domain.Result;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.CheckoutObject;
import org.learn.bombs.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/checkout")
public class CheckoutToOrderController {

    @Autowired
    CheckoutOrderService service;



    @PostMapping
    ResponseEntity translateCheckoutToOrder(@RequestBody List<CheckoutObject> checkingOutOrder){
        AppUser requestingUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<List<Order>> addResult = service.makeOrder(checkingOutOrder, requestingUser);

                if(addResult.isSuccess()){
                    return new ResponseEntity(addResult.getPayload(), HttpStatus.CREATED);
                }

                return ResponseEntity.badRequest().body(addResult.getErrorMessages());
    }
}
