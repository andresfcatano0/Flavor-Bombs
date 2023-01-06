package org.learn.bombs.data;

import org.learn.bombs.models.Order;

import java.util.List;

public interface OrderRepo {
    List<Order> getPrivateOrdersByUsername(String username);

}
