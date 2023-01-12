package org.learn.bombs.data;

import org.learn.bombs.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReviewDatabaseRepositoryTest {

    @Autowired
    ReviewDatabaseRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllReviews() {
        List<Review> reviews = repository.getReviews();
        assertNotNull(reviews);
        assertEquals(6, reviews.size());
    }

    @Test
    void shouldFindReviewById() {
        Review review = repository.getReviewById(1);
        assertEquals(1, review.getReviewId());
        assertEquals("It was great!", review.getReviewText());
    }

    @Test
    void shouldNotFindReview() {
        Review review = repository.getReviewById(11);
        assertNull(review);
    }

    @Test
    void shouldAddReview() {
        Review review = makeReview();
        Review actual = repository.addReview(review);
        assertNotNull(actual);
        assertEquals("Test", actual.getReviewText());
    }

    @Test
    void shouldDeleteReview() {
        repository.deleteReviewById(1);
        Review review = repository.getReviewById(1);
        assertNull(review);
    }

    private Review makeReview() {
        Review review = new Review();
        review.setReviewText("Test");
//        review.setOwner();
        review.setRestaurantId(1);
        return review;
    }

}