package org.learn.bombs.data;

import org.learn.bombs.models.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MenuDatabaseRepository implements MenuRepository{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Menu findById(int menuId) {
        final String sql = "select menu_id, item_description, item_name, item_price, restaurant_id "
                + "from menu "
                + "where menu_id = ?;";

        return jdbcTemplate.query(sql, new MenuMapper(), menuId).stream()
                .findFirst()
                .orElse(null);
    }

}
