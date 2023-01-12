package org.learn.bombs.domain;

import org.learn.bombs.data.OrderRepo;
import org.learn.bombs.models.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class OrderServiceTest {

    @Autowired
    OrderService service;

    @MockBean
    OrderRepo repository;

//    @Test
//    void ShouldFindOrder() {
//        Order expected = makeOrder();
//        when(repository.getOrderById(1)).thenReturn(expected);
//        List<Order> actual = service.getAllOrders().getPayload();
//        assertEquals(expected.getOrderItems(), actual.);
//    }


//    @Test
//        void ShouldDeleteOrder() {
//        Result<Void> result = service.deleteOrderById(1, AppUserService.);
//        assertFalse(result.isSuccess());
//    }

    Order makeOrder() {
        Order order = new Order();
        order.setOrderId(1);
        order.setOrderItems("Chicken Burrito");
//        order.setOwner();
        order.setRestaurantId(1);
        return order;
    }

}