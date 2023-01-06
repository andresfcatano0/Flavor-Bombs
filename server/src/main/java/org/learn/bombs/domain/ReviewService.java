package org.learn.bombs.domain;

import org.learn.bombs.data.ReviewRepository;
import org.learn.bombs.models.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    public Result<List<Review>> getReviews() {
        Result<List<Review>> result = new Result<>();

        List<Review> publicRestaurants = repository.getReviews();

        result.setPayload(publicRestaurants);

        return result;
    }


    public Result<Void> deleteReviewById(int reviewId) {
        Result<Void> deleteResult = new Result<Void>();

        Review toDelete = repository.getReviewById(reviewId);

        if( toDelete != null ){
            repository.deleteReviewById(reviewId);
        } else {
            deleteResult.addErrorMessage("Cannot delete review");
        }

        return deleteResult;
    }


}
