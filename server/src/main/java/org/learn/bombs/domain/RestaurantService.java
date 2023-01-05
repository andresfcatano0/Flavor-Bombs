package org.learn.bombs.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.learn.bombs.data.RestaurantRepo;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Restaurant;

import java.util.List;

public class RestaurantService {

    @Autowired
    RestaurantRepo repo;

    @Autowired
    UserRepo uRepo;




}
