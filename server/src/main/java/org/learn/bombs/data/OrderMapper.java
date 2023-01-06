package org.learn.bombs.data;

import org.springframework.jdbc.core.RowMapper;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Order;

import java.sql.ResultSet;
import java.sql.SQLException;

public class OrderMapper implements RowMapper<Order> {
    @Override
    public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
        Order toBuild = new Order();
        toBuild.setOrderId( rs.getInt("order_id"));
        toBuild.setOrderItems(rs.getString("order_items"));
        toBuild.setAppUserId( rs.getInt("app_user_id"));
        toBuild.setRestaurantId( rs.getInt("restaurant_id"));

        try{
            rs.findColumn("username");
            String username = rs.getString("username");
            if( username != null ){
                //username column exists in the query
                //AND a valid username was returned
                //so we'll build the owner

                AppUser orderOwner = new AppUser();
                orderOwner.setUsername( username );
                orderOwner.setAppUserId( rs.getInt("app_user_id"));
                orderOwner.setEnabled( rs.getBoolean( "enabled"));
                orderOwner.setEmail( rs.getString("email"));

                toBuild.setOwner(orderOwner);
            }

        } catch (SQLException ex){
            //the column being missing is fine, we just
            //won't load the user data
        }

        return toBuild;
    }

}
