package org.learn.bombs.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.learn.bombs.models.Restaurant;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RestaurantDatabaseRepo implements RestaurantRepo {

    @Autowired
    JdbcTemplate template;

    @Override
    public List<Restaurant> getPublicRestaurants() {

        //select all restaurants
        List<Restaurant> publicRestaurants = template.query(
                "select * from restaurants",
                new RestaurantMapper()
        );

        return publicRestaurants;
    }

    @Override
    public void deleteRestaurantById(Integer restaurantId) {
        int rowsAffected = template.update( "delete from restaurants where restaurant_id = ?", restaurantId);

        //should always be equal to 1...
        //TODO: add validation to ensure we affected one (and only one!) row
    }

    @Override
    public Restaurant getRestaurantById(Integer restaurantId) {
        String sql = "SELECT * \n" +
                "FROM restaurants\n" +
//                "left outer join app_user on todo.user_id = app_user.app_user_id\n" +
                "where restaurant_id = ?";

        List<Restaurant> matchingRestaurants = template.query( sql, new RestaurantMapper(), restaurantId );

        if( matchingRestaurants.size() == 1){
            return matchingRestaurants.get(0);
        }

        return null;
    }


}
