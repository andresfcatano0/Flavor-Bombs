package org.learn.bombs.data;

import org.learn.bombs.models.Restaurant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RestaurantDatabaseRepoTest {

    @Autowired
    RestaurantDatabaseRepo repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllRestaurants() {
        List<Restaurant> restaurants = repository.getPublicRestaurants();
        assertNotNull(restaurants);
        assertEquals(3, restaurants.size());
    }

    @Test
    void shouldFindRestaurantById() {
        Restaurant restaurant = repository.getRestaurantById(1);
        assertEquals(1, restaurant.getRestaurantId());
        assertEquals("Taco House", restaurant.getRestaurantName());
        assertEquals("Serving the best tacos in town since 1958", restaurant.getDescription());
    }

    @Test
    void shouldNotFindRestaurantById() {
        Restaurant restaurant = repository.getRestaurantById(99);
        assertNull(restaurant);
    }

    @Test
    void shouldDeleteRestaurant() {
        repository.deleteRestaurantById(1);
        Restaurant restaurant = repository.getRestaurantById(1);
        assertNull(restaurant);

        List<Restaurant> restaurants = repository.getPublicRestaurants();
        assertEquals(2, restaurants.size());
    }

    @Test
    void shouldNotDeleteRestaurant() {
        repository.deleteRestaurantById(99);
        Restaurant restaurant = repository.getRestaurantById(99);
        assertNull(restaurant);

        List<Restaurant> restaurants = repository.getPublicRestaurants();
        assertEquals(3, restaurants.size());
    }

}

