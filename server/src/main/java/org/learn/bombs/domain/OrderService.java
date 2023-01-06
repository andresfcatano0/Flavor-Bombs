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

}
