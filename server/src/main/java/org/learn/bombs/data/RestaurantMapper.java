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
        toBuild.setPhoneNumber(rs.getString("phone_number"));
        toBuild.setAddress(rs.getString("address"));
        toBuild.setOpenHours(rs.getString("open_hours"));
        toBuild.setDescription(rs.getString("descript"));

        toBuild.setRestaurantImage(rs.getString("restaurant_image"));
        toBuild.setFilterTags(rs.getString("filters"));

        toBuild.setLatitude(rs.getBigDecimal("latitude"));
        toBuild.setLongitude(rs.getBigDecimal("longitude"));


        return toBuild;
    }

}