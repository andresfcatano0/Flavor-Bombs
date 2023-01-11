package org.learn.bombs.data;

import org.learn.bombs.models.Menu;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MenuMapper implements RowMapper<Menu> {

    @Override
    public Menu mapRow(ResultSet resultSet, int i) throws SQLException {
        Menu menu = new Menu();
        menu.setMenuId(resultSet.getInt("menu_id"));
        menu.setItemName(resultSet.getString("item_name"));
        menu.setItemDescription(resultSet.getString("item_description"));
        menu.setItemPrice(resultSet.getBigDecimal("item_price"));
        menu.setRestaurantId(resultSet.getInt("restaurant_id"));
        menu.setItemImage(resultSet.getString("menu_image"));
        menu.setFilterTags(resultSet.getString("filters"));

        return menu;
    }
}
