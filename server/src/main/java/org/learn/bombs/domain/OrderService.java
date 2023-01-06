package org.learn.bombs.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.learn.bombs.data.OrderRepo;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Order;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepo repo;

    @Autowired
    UserRepo uRepo;

    public Result<List<Order>> getPrivateOrdersByUsername(String username) {
        Result<List<Order>> privateLookupResult = new Result<>();

        if( username == null || username.isBlank() ){
            privateLookupResult.addErrorMessage("Missing username");
        }

        if( privateLookupResult.isSuccess() ){
            List<Order> privateOrders = repo.getPrivateOrdersByUsername( username );
            privateLookupResult.setPayload(privateOrders);
        }

        return privateLookupResult;
    }


    public Result deleteOrderById(Integer orderId, String username) {
        Result deleteResult = new Result();

        Order toDelete = repo.getOrderById( orderId );

        AppUser deletingUser = uRepo.loadUserByUsername(username);

        Boolean isAdmin = deletingUser.getRoles().stream().anyMatch(r -> r.equals("ADMIN"));

        if( toDelete.getOwner().getUsername().equals(username) || isAdmin){
            //this belongs to the current user, so they're allowed to delete it
            repo.deleteOrderById( orderId );
        } else {
            deleteResult.addErrorMessage("Cannot delete order for another user.");
        }

        return deleteResult;
    }

    public Result<Order> addOrder(Order toAdd, String username) {

        Result<Order> addResult = new Result<>();

        AppUser addingUser = uRepo.loadUserByUsername(username);
        toAdd.setOwner(addingUser);

        Order fullyHydrated = repo.addOrder( toAdd );

        addResult.setPayload( fullyHydrated );

        return addResult;

    }

}
