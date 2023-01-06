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
}
