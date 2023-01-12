package org.learn.bombs.data;

import org.learn.bombs.models.AppUser;
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
    void shouldNotFindReviewById() {
        Review review = repository.getReviewById(99);
        assertNull(review);
    }

    @Test
    void shouldDeleteReview() {
        repository.deleteReviewById(1);
        Review review = repository.getReviewById(1);
        assertNull(review);

        List<Review> reviews = repository.getReviews();
        assertEquals(5, reviews.size());
    }

    @Test
    void shouldNotDeleteReview() {
        repository.deleteReviewById(99);
        Review review = repository.getReviewById(99);
        assertNull(review);

        List<Review> reviews = repository.getReviews();
        assertEquals(6, reviews.size());
    }

    @Test
    void shouldAddReview() {
        Review review = makeReview();
        Review actual = repository.addReview(review);
        assertNotNull(actual);
        assertEquals("Test", actual.getReviewText());

        List<Review> reviews = repository.getReviews();
        assertEquals(7, reviews.size());
    }

    @Test
    void shouldNotAddReview() {
        // Missing owner and restaurant id
        Review review = new Review();
        review.setReviewText("Test fail");

        repository.addReview(review);

        List<Review> reviews = repository.getReviews();
        assertEquals(6, reviews.size());
    }

    @Test
    void shouldUpdateReview() {
        Review review = makeReview();
        review.setReviewId(1);
        assertTrue(repository.updateReview(review));
    }

    @Test
    void shouldNotUpdateReview() {
        Review review = makeReview();
        review.setReviewId(99);
        assertFalse(repository.updateReview(review));
    }

    private Review makeReview() {
        Review review = new Review();
        review.setReviewText("Test");
        review.setOwner(makeUser());
        review.setRestaurantId(1);
        return review;
    }

    AppUser makeUser() {
        AppUser appUser = new AppUser();
        appUser.setAppUserId(1);
        appUser.setFirstName("john");
        appUser.setLastName("doe");
        appUser.setUsername("johndoe");
        appUser.setPassword("top-secret-password");
        appUser.setEmail("johndoe@email.com");
        return appUser;
    }

}