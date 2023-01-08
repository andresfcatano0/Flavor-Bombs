package org.learn.bombs.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.learn.bombs.models.Order;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class OrderDatabaseRepo implements OrderRepo{

    @Autowired
    JdbcTemplate template;

    @Override
    public List<Order> getPrivateOrdersByUsername(String username) {
        String sql = "select orders.* \n" +
                "from orders\n" +
                "inner join app_user on orders.app_user_id = app_user.app_user_id\n" +
                "where username = ?";

        List<Order> personalOrders = template.query(sql, new OrderMapper(), username);

        return personalOrders;
    }

    @Override
    public List<Order> getOrdersByRestaurantId(Integer id) {
        String sql = "select * from orders where restaurant_id = ?";

        List<Order> restaurantOrders = template.query(sql, new OrderMapper(), id);

        return restaurantOrders;
    }

    @Override
    public void deleteOrderById(Integer orderId) {
        int rowsAffected = template.update( "delete from orders where order_id = ?", orderId);
    }

    @Override
    public Order getOrderById(Integer orderId) {
        String sql = "SELECT * \n" +
                "FROM orders\n" +
                "left outer join app_user on orders.app_user_id = app_user.app_user_id\n" +
                "where order_id = ?";

        List<Order> matchingTodos = template.query( sql, new OrderMapper(), orderId );

        if( matchingTodos.size() == 1){
            return matchingTodos.get(0);
        }

        return null;
    }

    @Override
    public Order addOrder(Order toAdd) {

        //need to get id from the insert and set it on the Order object
        KeyHolder holder = new GeneratedKeyHolder();

        if( toAdd.getOwner() != null ){
            int rowsAffected = template.update(  connection -> {
                PreparedStatement statement = connection.prepareStatement(
                        "insert into orders (order_items,app_user_id,restaurant_id) values (?,?,?)",
                        Statement.RETURN_GENERATED_KEYS
                );

                statement.setString(1, toAdd.getOrderItems());
                statement.setInt( 2, toAdd.getOwner().getAppUserId() );
                statement.setInt( 3, toAdd.getRestaurantId() );

                return statement;
            }, holder);
            if( rowsAffected != 1 ){
                return null;
            }
            toAdd.setOrderId( holder.getKey().intValue() );
        }
        return toAdd;
    }

    @Override
    public boolean updateOrder(Order order) {
        final String sql = "update orders set " +
                "order_items = ?, " +
                "app_user_id = ?, " +
                "restaurant_id = ? " +
                "where order_id = ?;";

        int rowsUpdated = template.update(sql, order.getOrderItems(), order.getOwner().getAppUserId(),
                order.getRestaurantId(), order.getOrderId());

        return rowsUpdated > 0;
    }

}
