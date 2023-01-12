package org.learn.bombs.domain;

import org.learn.bombs.data.MenuRepository;
import org.learn.bombs.models.Menu;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class MenuServiceTest {

    @Autowired
    MenuService service;

    @MockBean
    MenuRepository repository;

    @Test
    void ShouldFindMenu() {
        Menu expected = makeMenu();
        when(repository.findById(1)).thenReturn(expected);
        String actual = service.findById(1).getItemName();
        assertEquals(expected.getItemName(), actual);
    }

    @Test
    void ShouldDeleteMenu() {
        Result<Void> result = service.deleteMenuById(1);
        assertFalse(result.isSuccess());
    }

    Menu makeMenu() {
        Menu menu = new Menu();
        menu.setMenuId(1);
        menu.setItemName("Chicken Burrito");
        menu.setItemDescription("Its a chicken burrito with beans.");
        menu.setItemPrice(BigDecimal.valueOf(13.50));
        menu.setRestaurantId(1);
        return menu;
    }

}