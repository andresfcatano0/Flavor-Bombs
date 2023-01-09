package org.learn.bombs.domain;

import org.learn.bombs.data.AppUserRepository;
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



}
