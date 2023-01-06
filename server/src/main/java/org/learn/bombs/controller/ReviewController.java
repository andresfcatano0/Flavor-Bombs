package org.learn.bombs.controller;

import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.ReviewService;
import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin( origins = "http://localhost:3000")
@RequestMapping( "/api/review" )
public class ReviewController {

    @Autowired
    ReviewService service;

    //getting all public restaurants
    @GetMapping()
    ResponseEntity getReviews(){

        Result<List<Review>> publicGetResult = service.getReviews();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }


    @DeleteMapping("/{id}")
    ResponseEntity deleteReviewsById(@PathVariable Integer id){

        Result deleteResult = service.deleteReviewById(id);

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

}