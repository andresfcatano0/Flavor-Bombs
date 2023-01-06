package org.learn.bombs.domain;

import org.learn.bombs.data.OrderRepo;
import org.learn.bombs.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.learn.bombs.data.RestaurantRepo;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Restaurant;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepo repo;

    @Autowired
    UserRepo uRepo;

    @Autowired
    OrderRepo orderRepo;

    public Result<List<Restaurant>> getPublicRestaurants() {
        Result<List<Restaurant>> result = new Result<>();

        List<Restaurant> publicRestaurants = repo.getPublicRestaurants();

        result.setPayload(publicRestaurants);

        return result;
    }

    public Result<Restaurant> getRestaurantById(Integer id){
        Result<Restaurant> lookupResult = new Result<>();
        Restaurant foundRestaurant = repo.getRestaurantById(id);
        if (foundRestaurant == null){
            lookupResult.addErrorMessage("Invalid restaurant Id");
            return lookupResult;
        }
        List<Order> restaurantOrders = orderRepo.getOrdersByRestaurantId(id);
        foundRestaurant.setOrders(restaurantOrders);
        // Todo: Fill in reviews similarly to orders

        lookupResult.setPayload(foundRestaurant);
        return lookupResult;
    }


    public Result<Void> deleteRestaurantById(Integer restaurantId) {
        Result<Void> deleteResult = new Result<Void>();

        Restaurant toDelete = repo.getRestaurantById( restaurantId );

        if( toDelete != null ){
            repo.deleteRestaurantById( restaurantId );
        } else {
            deleteResult.addErrorMessage("Cannot delete restaurant");
        }

        return deleteResult;
    }



}
