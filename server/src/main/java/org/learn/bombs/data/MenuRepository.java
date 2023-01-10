package org.learn.bombs.data;

import org.learn.bombs.models.Menu;
import org.learn.bombs.models.Review;

import java.util.List;

public interface MenuRepository {
    Menu findById(int menuId);

    List<Menu> getMenu();

    void deleteMenuById(int menuId);
}
