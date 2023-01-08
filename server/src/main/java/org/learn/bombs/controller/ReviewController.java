package org.learn.bombs.controller;

import org.learn.bombs.domain.Result;
import org.learn.bombs.domain.ReviewService;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Menu;
import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping
    ResponseEntity addReview( @RequestBody Review toAdd ){
        AppUser requestingUser = (AppUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<Review> addResult = service.addReview( toAdd, requestingUser.getUsername() );

        if( addResult.isSuccess() ){
            return new ResponseEntity( addResult.getPayload(), HttpStatus.CREATED);
        }

        return ResponseEntity.badRequest().body( addResult.getErrorMessages() );
    }


    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable int reviewId) {
        Review review = service.getReviewById(reviewId);
        if (review == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(review);
    }


    @DeleteMapping("/{reviewId}")
    ResponseEntity deleteReviewsById(@PathVariable int reviewId){

        Result deleteResult = service.deleteReviewById(reviewId);

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

    @PutMapping("/{reviewId}")
    ResponseEntity updateReview( @PathVariable int reviewId, @RequestBody Review review) {
        AppUser requestingUser = (AppUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Result<Review> updateResult = service.updateReview(review, requestingUser.getUsername());

        if (reviewId != review.getReviewId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (updateResult.isSuccess() ){
            return new ResponseEntity(updateResult.getPayload(), HttpStatus.CREATED);
        }

        return ResponseEntity.badRequest().body(updateResult.getErrorMessages() );
    }

}

