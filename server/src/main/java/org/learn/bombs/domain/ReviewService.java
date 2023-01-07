package org.learn.bombs.domain;

import org.learn.bombs.data.ReviewRepository;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Menu;
import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repository;

    @Autowired
    UserRepo userRepo;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    public Result<List<Review>> getReviews() {
        Result<List<Review>> result = new Result<>();

        List<Review> publicRestaurants = repository.getReviews();

        result.setPayload(publicRestaurants);

        return result;
    }

    public Review getReviewById(int reviewId) {
        return repository.getReviewById(reviewId);
    }

    public Result<Void> deleteReviewById(int reviewId) {
        Result<Void> deleteResult = new Result<Void>();

        Review toDelete = repository.getReviewById(reviewId);

        if (toDelete != null) {
            repository.deleteReviewById(reviewId);
        } else {
            deleteResult.addErrorMessage("Cannot delete review");
        }

        return deleteResult;
    }

    public Result<Review> addReview(Review toAdd, String username) {

        Result<Review> addResult = new Result<>();

        AppUser addingUser = userRepo.loadUserByUsername(username);
        toAdd.setOwner(addingUser);

        Review fullyHydrated = repository.addReview(toAdd);

        addResult.setPayload(fullyHydrated);

        return addResult;


    }
}