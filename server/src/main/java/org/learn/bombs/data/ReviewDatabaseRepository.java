package org.learn.bombs.data;

import org.learn.bombs.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
@Repository
public class ReviewDatabaseRepository implements ReviewRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;


    @Override
    public Review getReviewById(int reviewId) {
        final String sql = "select review_id, review_text, app_user_id, restaurant_id "
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
                    "select review_id, review_text, app_user_id, restaurant_id "
                            + "from reviews;",

                    new ReviewMapper()
            );
            return reviews;
        }

    @DeleteMapping
        public void deleteReviewById(int reviewId){
            int rowsAffected = jdbcTemplate.update("delete from reviews where review_id = ?", reviewId);

        }

    @Override
    public Review addReview(Review toAdd) {

            KeyHolder holder = new GeneratedKeyHolder();

            if( toAdd.getOwner() != null ){
                int rowsAffected = jdbcTemplate.update(  connection -> {
                    PreparedStatement statement = connection.prepareStatement(
                            "insert into reviews (review_text,app_user_id,restaurant_id) values (?,?,?)",
                            Statement.RETURN_GENERATED_KEYS
                    );

                    statement.setString(1, toAdd.getReviewText());
                    statement.setInt( 2, toAdd.getOwner().getAppUserId());
                    statement.setInt( 3, toAdd.getRestaurantId());
                    return statement;
                }, holder);
                if( rowsAffected != 1 ){
                    return null;
                }
                toAdd.setReviewId( holder.getKey().intValue() );
            }
            return toAdd;
        }

    @Override
    public boolean updateReview(Review review) {
        final String sql = "update reviews set " +
                "review_text = ?, " +
                "app_user_id = ?, " +
                "restaurant_id = ? " +
                "where review_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql, review.getReviewText(), review.getOwner().getAppUserId(),
                review.getRestaurantId(), review.getReviewId());

        return rowsUpdated > 0;
    }
}
