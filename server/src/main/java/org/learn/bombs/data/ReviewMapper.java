package org.learn.bombs.data;

import org.learn.bombs.models.Review;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;


public class ReviewMapper implements RowMapper<Review> {
    @Override
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
        Review review = new Review();
        review.setReviewId(resultSet.getInt("review_id"));
        review.setReviewText(resultSet.getString("review_text"));
        review.setAppUserId(resultSet.getInt("app_user_id"));
        return review;
        }
}

