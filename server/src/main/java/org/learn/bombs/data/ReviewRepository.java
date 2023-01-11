package org.learn.bombs.data;

import org.learn.bombs.models.Review;

import java.util.List;

public interface ReviewRepository {
    List<Review> getReviews();

    Review getReviewById(int reviewId);

    void deleteReviewById(int reviewId);

    Review addReview(Review toAdd);

    boolean updateReview(Review review);

    List<Review> getReviewsByAppUserId(Integer id);

    List<Review> getReviewsByRestaurantId(Integer id);
}
