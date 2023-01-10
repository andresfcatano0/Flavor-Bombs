package org.learn.bombs.domain;

import org.learn.bombs.data.AppUserRepository;
import org.learn.bombs.data.OrderRepo;
import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Order;
import org.learn.bombs.models.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    UserRepo repo;

    @Autowired
    OrderRepo orderRepo;

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository repository, PasswordEncoder encoder){
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.loadUserByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<List<AppUser>> getAllAppUser() {
        Result<List<AppUser>> result = new Result<>();

        List<AppUser> allAppUsers = repo.getAllAppUsers();

        result.setPayload(allAppUsers);

        return result;
    }

    public Result<AppUser> getAppUserById(Integer id) {
        Result<AppUser> lookupResult = new Result<>();
        AppUser foundAppUser = repo.getAppUserById(id);
        if (foundAppUser == null){
            lookupResult.addErrorMessage("Invalid user Id");
            return lookupResult;
        }

        // agent-alias relationship
        List<Order> appUserOrders = orderRepo.getOrdersByAppUserId(id);
        foundAppUser.setOrders(appUserOrders);

        lookupResult.setPayload(foundAppUser);
        return lookupResult;
    }

    public Result deleteAppUserById(Integer id) {
        Result<Void> deleteResult = new Result<Void>();

        AppUser toDelete = repo.getAppUserById( id );

        if( toDelete != null ){
            repo.deleteAppUserById( id );
        } else {
            deleteResult.addErrorMessage("Cannot delete user");
        }

        return deleteResult;
    }

    public Result<AppUser> update(AppUser appUser, String username) {
        Result<AppUser> updateResult = new Result<>();

        AppUser updatingUser = repo.loadUserByUsername(username);
//        appUser.setOwner(updatingUser);

        if (appUser.getAppUserId() <= 0) {
            updateResult.addErrorMessage("User `id` is required.");
        }

        if (updateResult.isSuccess()) {
            if (repo.updateAppUser(appUser)) {
                updateResult.setPayload(appUser);
            } else {
                updateResult.addErrorMessage("Order id was not found." );
            }
        }

        return updateResult;
    }


}
