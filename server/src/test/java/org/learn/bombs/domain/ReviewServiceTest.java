package org.learn.bombs.domain;

import org.learn.bombs.data.ReviewRepository;
import org.learn.bombs.models.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ReviewServiceTest {

    @Autowired
    ReviewService service;

    @MockBean
    ReviewRepository repository;

    @Test
    void ShouldFindReview() {
        Review expected = makeReview();
        when(repository.getReviewById(1)).thenReturn(expected);
        String actual = service.getReviewById(1).getReviewText();
        assertEquals(expected.getReviewText(), actual);
    }

    @Test
    void ShouldDeleteReview() {
        Result<Void> result = service.deleteReviewById(1);
        assertFalse(result.isSuccess());
    }

    Review makeReview() {
        Review review = new Review();
        review.setReviewId(1);
        review.setReviewText("It was great!");
//        review.setOwner();
        review.setRestaurantId(1);
        return review;
    }

}