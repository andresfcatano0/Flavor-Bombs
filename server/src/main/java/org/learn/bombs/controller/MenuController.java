package org.learn.bombs.controller;

import org.learn.bombs.domain.MenuService;
import org.learn.bombs.models.Menu;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService service;

    public MenuController(MenuService service) {
        this.service = service;
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<Menu> findById(@PathVariable int menuId) {
        Menu menu = service.findById(menuId);
        if (menu == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(menu);
    }

}
