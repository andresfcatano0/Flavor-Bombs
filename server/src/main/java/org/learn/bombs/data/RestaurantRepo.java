package org.learn.bombs.data;

import org.learn.bombs.models.Restaurant;

import java.util.List;


public interface RestaurantRepo {
    List<Restaurant> getPublicRestaurants();

//    List<Restaurant> getPrivateRestaurantsByUsername(String username);

    void deleteRestaurantById(Integer restaurantId);

    Restaurant getRestaurantById(Integer restaurantId);

//    Restaurant addRestaurant(Restaurant toAdd);
}
