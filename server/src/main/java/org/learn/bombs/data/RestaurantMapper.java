package org.learn.bombs.data;

import org.springframework.jdbc.core.RowMapper;
import org.learn.bombs.models.Restaurant;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RestaurantMapper implements RowMapper<Restaurant> {
    @Override
    public Restaurant mapRow(ResultSet rs, int rowNum) throws SQLException {
        Restaurant toBuild = new Restaurant();
        toBuild.setRestaurantId( rs.getInt("restaurant_id"));
        toBuild.setRestaurantName(rs.getString("restaurant_name"));
        toBuild.setAddress(rs.getString("address"));
        toBuild.setOpenHours(rs.getString("open_hours"));
        toBuild.setDescription(rs.getString("descript"));

        return toBuild;
    }

}