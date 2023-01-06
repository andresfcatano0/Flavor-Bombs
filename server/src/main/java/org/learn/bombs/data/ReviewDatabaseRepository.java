package org.learn.bombs.data;

import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;
@Repository
public class ReviewDatabaseRepository implements ReviewRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    @Override
    public Review getReviewById(int reviewId) {
        final String sql = "select review_id, review_text, app_user_id "
                + "from reviews "
                + "where review_id = ?;";
        return jdbcTemplate.query(sql, new ReviewMapper(), reviewId).stream()
                .findFirst()
                .orElse(null);
    }


    @Override
        public List<Review> getReviews(){
            // Find all listings
            List<Review> reviews = jdbcTemplate.query(
                    "select review_id, review_text, app_user_id "
                            + "from reviews;",

                    new ReviewMapper()
            );
            return reviews;
        }

    @DeleteMapping
        public void deleteReviewById(int reviewId){
            int rowsAffected = jdbcTemplate.update("delete from reviews where review_id = ?", reviewId);

        }
    }
