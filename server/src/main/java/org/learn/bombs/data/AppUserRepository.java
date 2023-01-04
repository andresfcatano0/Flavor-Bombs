package org.learn.bombs.data;

import org.learn.bombs.App;
import org.learn.bombs.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
}
