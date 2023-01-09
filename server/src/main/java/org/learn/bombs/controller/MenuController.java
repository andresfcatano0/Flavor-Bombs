package org.learn.bombs.controller;

import org.learn.bombs.domain.MenuService;
import org.learn.bombs.domain.Result;
import org.learn.bombs.models.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    MenuService service;

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


    @GetMapping()
    ResponseEntity getMenu(){

        Result<List<Menu>> publicGetResult = service.getMenu();

        if( publicGetResult.isSuccess() ){
            return ResponseEntity.ok(publicGetResult.getPayload());
        }

        return ResponseEntity.badRequest().body(publicGetResult.getErrorMessages());
    }

    @DeleteMapping("/{menuId}")
    ResponseEntity deleteMenuById(@PathVariable int menuId){

        Result deleteResult = service.deleteMenuById(menuId);

        if(deleteResult.isSuccess()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.badRequest().body(deleteResult.getErrorMessages());
    }

}
