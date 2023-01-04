package org.learn.bombs.data;

import org.learn.bombs.models.AppUser;

public interface UserRepo {
    AppUser loadUserByUsername(String username);
}
