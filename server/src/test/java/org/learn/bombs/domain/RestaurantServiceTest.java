package org.learn.bombs.domain;

import org.learn.bombs.data.RestaurantRepo;
import org.learn.bombs.models.Restaurant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class RestaurantServiceTest {

    @Autowired
    RestaurantService service;

    @MockBean
    RestaurantRepo repository;

    @Test
    void ShouldFindRestaurant() {
        Restaurant expected = makeRestaurant();
        when(repository.getRestaurantById(1)).thenReturn(expected);
        String actual = service.getRestaurantById(1).getPayload().getRestaurantName();
        assertEquals(expected.getRestaurantName(), actual);
    }

    @Test
    void ShouldDeleteRestaurant() {
        Result<Void> result = service.deleteRestaurantById(1);
        assertFalse(result.isSuccess());
        System.out.println(result.errorMessages);
    }

    @Test
    void ShouldNotDeleteRestaurant() {
        Result<Void> result = service.deleteRestaurantById(99);
        assertFalse(result.isSuccess());
    }

    Restaurant makeRestaurant() {
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantId(1);
        restaurant.setRestaurantName("Dumpling Lady");
        restaurant.setAddress("88 dumpling street");
        restaurant.setOpenHours("Monday to Friday - 10am to 8pm");
        restaurant.setDescription("Serving the best dumpling in Miami since 2008");
        return restaurant;
    }

}