package org.learn.bombs.data;

import org.learn.bombs.models.AppUser;

import java.util.List;

public interface UserRepo {

    AppUser loadUserByUsername(String username);

    List<AppUser> getAllAppUsers();

    AppUser getAppUserById(Integer id);

    void deleteAppUserById(Integer id);

    boolean updateAppUser(AppUser appUser);
}
