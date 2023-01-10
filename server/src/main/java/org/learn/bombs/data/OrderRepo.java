package org.learn.bombs.data;

import org.learn.bombs.models.Order;

import java.util.List;

public interface OrderRepo {
    List<Order> getPrivateOrdersByUsername(String username);

    void deleteOrderById(Integer orderId);

    Order getOrderById(Integer orderId);

    Order addOrder(Order toAdd);

    boolean updateOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getOrdersByRestaurantId(Integer id);

    List<Order> getOrdersByAppUserId(Integer id);
}
