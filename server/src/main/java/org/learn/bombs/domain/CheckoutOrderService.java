package org.learn.bombs.domain;


import org.learn.bombs.data.OrderRepo;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.CheckoutObject;
import org.learn.bombs.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CheckoutOrderService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    OrderRepo repo;


    public Result<List<Order>> makeOrder(List<CheckoutObject> items, AppUser owner) {
        Result<List<Order>> result = new Result<>();

        owner = userRepo.loadUserByUsername(owner.getUsername());


        ArrayList<Order> orders = new ArrayList<>();

//        grouped items by restaurantId, since ordering from multiple restaurants
        Map<Integer, List<CheckoutObject>> itemsByRestaurantId =
                items.stream().collect(Collectors.groupingBy(CheckoutObject::getRestaurantId));

        for(int restaurantId : itemsByRestaurantId.keySet()){
            List<CheckoutObject> itemsForRestaurant = itemsByRestaurantId.get(restaurantId);
            Order orderFromRestaurant = new Order();
            orderFromRestaurant.setRestaurantId(restaurantId);
            orderFromRestaurant.setOrderDate(LocalDate.now());
            orderFromRestaurant.setOwner(owner);

            String commaSeparated = "";
            int itemCount = 0;
            BigDecimal price = BigDecimal.ZERO;

            for(CheckoutObject item : itemsForRestaurant){
                commaSeparated = commaSeparated+item.getItemName()+",";
                itemCount += item.getQuantity();
                price = price.add(item.getItemPrice().multiply(new BigDecimal(item.getQuantity())));
            }

            orderFromRestaurant.setOrderItems(commaSeparated);

            orderFromRestaurant.setItemQuantity(itemCount);

            orderFromRestaurant.setTotalPrice(price);

            orders.add(orderFromRestaurant);


        }

        for(Order o : orders){
            repo.addOrder(o);
        }

        result.setPayload(orders);

        return result;

    }
}
