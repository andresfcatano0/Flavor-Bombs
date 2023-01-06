package org.learn.bombs.domain;

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

    public Result<List<Restaurant>> getPublicRestaurants() {
        Result<List<Restaurant>> result = new Result<>();

        List<Restaurant> publicRestaurants = repo.getPublicRestaurants();

        result.setPayload(publicRestaurants);

        return result;
    }



}
