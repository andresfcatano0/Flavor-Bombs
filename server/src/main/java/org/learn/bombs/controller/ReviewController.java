package org.learn.bombs.controller;

import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.ReviewService;
import org.learn.bombs.models.Menu;
import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin( origins = "http://localhost:3000")
@RequestMapping( "/api/review" )
public class ReviewController {

    @Autowired
    ReviewService service;

    @GetMapping()
    ResponseEntity getReviews(){

        Result<List<Review>> publicGetResult = service.getReviews();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable int reviewId) {
        Review review = service.getReviewById(reviewId);
        if (review == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(review);
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