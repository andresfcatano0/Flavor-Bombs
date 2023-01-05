package org.learn.bombs.data;

import org.learn.bombs.models.Menu;

public interface MenuRepository {
    Menu findById(int menuId);
}
