package org.learn.bombs.data;

import org.learn.bombs.App;
import org.learn.bombs.models.AppUser;
import org.learn.bombs.models.Restaurant;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AppUserRepository implements UserRepo{
    private final JdbcTemplate jdbcTemplate;

    public AppUserRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public AppUser loadUserByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = "select app_user_id, first_name, last_name, username, passhash, email, enabled "
                + "from app_user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from user_roles ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }

    @Override
    public List<AppUser> getAllAppUsers() {
        //select all restaurants
        List<AppUser> allAppUsers = jdbcTemplate.query(
                "select * from app_user",
                new AppUserMapper(new ArrayList<>())
        );

        return allAppUsers;
    }

    @Override
    public AppUser getAppUserById(Integer id) {
        String sql = "SELECT * \n" +
                "FROM app_user\n" +
                "where app_user_id = ?";

        List<AppUser> matchingRestaurants = jdbcTemplate.query( sql, new AppUserMapper(new ArrayList<>()), id );

        if( matchingRestaurants.size() == 1){
            return matchingRestaurants.get(0);
        }

        return null;
    }

    @Override
    public void deleteAppUserById(Integer id) {
        int rowsAffected = jdbcTemplate.update( "delete from app_user where app_user_id = ?", id);
    }

    @Override
    public boolean updateAppUser(AppUser appUser) {
        final String sql = "update app_user set " +
                "first_name = ?, " +
                "last_name = ?, " +
                "username = ? " +
                "passhash = ? " +
                "email = ? " +
                "enabled = ? " +
                "where app_user_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql, appUser.getFirstName(), appUser.getLastName(),
                appUser.getUsername(), appUser.getPassword(), appUser.getEmail(),
                appUser.isEnabled(), appUser.getAppUserId());

        return rowsUpdated > 0;
    }


}
