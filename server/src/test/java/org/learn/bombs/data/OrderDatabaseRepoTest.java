package org.learn.bombs.data;

import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Order;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OrderDatabaseRepoTest {

    @Autowired
    OrderDatabaseRepo repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllOrders() {
        List<Order> orders = repository.getAllOrders();
        assertNotNull(orders);
        assertEquals(3, orders.size());
    }

    @Test
    void shouldFindOrderById() {
        Order order = repository.getOrderById(1);
        assertEquals(1, order.getOrderId());
        assertEquals("Chicken Burrito", order.getOrderItems());
    }

    @Test
    void shouldNotFindOrderById() {
        Order order = repository.getOrderById(99);
        assertNull(order);
    }

    @Test
    void shouldDeleteOrder() {
        repository.deleteOrderById(99);
        Order order = repository.getOrderById(99);
        assertNull(order);

        List<Order> orders = repository.getAllOrders();
        assertEquals(3, orders.size());
    }

    @Test
    void shouldNotDeleteOrder() {
        repository.deleteOrderById(1);
        Order order = repository.getOrderById(1);
        assertNull(order);

        List<Order> orders = repository.getAllOrders();
        assertEquals(2, orders.size());
    }

    @Test
    void shouldAddOrder() {
        Order order = makeOrder();
        Order actual = repository.addOrder(order);
        assertNotNull(actual);
        assertEquals("Test", actual.getOrderItems());

        List<Order> orders = repository.getAllOrders();
        assertEquals(4, orders.size());
    }

    @Test
    void shouldNotAddOrder() {
        // Missing owner, orderItems and restaurantId
        Order order = new Order();
        repository.addOrder(order);

        List<Order> orders = repository.getAllOrders();
        assertEquals(3, orders.size());
    }

    @Test
    void shouldUpdateOrder() {
        Order order = makeOrder();
        order.setOrderId(1);
        assertTrue(repository.updateOrder(order));
    }

    @Test
    void shouldNotUpdateOrder() {
        Order order = makeOrder();
        order.setOrderId(99);
        assertFalse(repository.updateOrder(order));
    }

    Order makeOrder() {
        Order order = new Order();
        order.setOrderItems("Test");
        order.setOwner(makeUser());
        order.setRestaurantId(1);
        return order;
    }

    AppUser makeUser() {
        AppUser appUser = new AppUser();
        appUser.setAppUserId(1);
        appUser.setFirstName("john");
        appUser.setLastName("doe");
        appUser.setUsername("johndoe");
        appUser.setPassword("top-secret-password");
        appUser.setEmail("johndoe@email.com");
        return appUser;
    }

}