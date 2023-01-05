package org.learn.bombs.data;

import org.learn.bombs.models.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

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


    @Override
    public List<Menu> getMenu() {
        // Find all listings
        List<Menu> publicMenu = jdbcTemplate.query(
                "select menu_id, item_description, item_name, item_price, restaurant_id "
                        + "from menu;",

                new MenuMapper()
        );

        return publicMenu;
    }
    @DeleteMapping
    public void deleteMenuItemById(Integer menuId) {
        int rowsAffected = jdbcTemplate.update( "delete from menu where menu_id = ?", menuId);

    }}
