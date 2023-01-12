package org.learn.bombs.data;

import org.learn.bombs.models.Menu;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MenuDatabaseRepositoryTest {

    @Autowired
    MenuDatabaseRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllMenus() {
        List<Menu> menus = repository.getMenu();
        assertNotNull(menus);
        assertEquals(9, menus.size());
    }

    @Test
    void shouldFindMenuById() {
        Menu menu = repository.findById(1);
        assertEquals(1, menu.getMenuId());
        assertEquals("Chicken Burrito", menu.getItemName());
        assertEquals("Its a chicken burrito with beans.", menu.getItemDescription());
    }

    @Test
    void shouldNotFindMenuById() {
        Menu menu = repository.findById(99);
        assertNull(menu);
    }

    @Test
    void shouldDeleteMenu() {
        repository.deleteMenuById(1);
        Menu menu = repository.findById(1);
        assertNull(menu);

        List<Menu> menus = repository.getMenu();
        assertEquals(8, menus.size());
    }

    @Test
    void shouldNotDeleteMenu() {
        repository.deleteMenuById(99);
        Menu menu = repository.findById(99);
        assertNull(menu);

        List<Menu> menus = repository.getMenu();
        assertEquals(9, menus.size());
    }

}