package org.learn.bombs.domain;

import org.learn.bombs.data.MenuRepository;
import org.learn.bombs.models.Menu;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final MenuRepository repository;

    public MenuService(MenuRepository repository) {
        this.repository = repository;
    }

    public Menu findById(int menuId) {
        return repository.findById(menuId);
    }

    public Result<List<Menu>> getMenu() {
        Result<List<Menu>> result = new Result<>();

        List<Menu> menu = repository.getMenu();

        result.setPayload(menu);

        return result;
    }



}
