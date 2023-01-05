package org.learn.bombs.data;

import org.learn.bombs.models.Menu;

import java.util.List;

public interface MenuRepository {
    Menu findById(int menuId);

    List<Menu> getMenu();
}
