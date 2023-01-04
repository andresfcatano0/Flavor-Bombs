package org.learn.bombs.controller;

import org.learn.bombs.domain.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import org.learn.bombs.security.JwtConverter;
import org.learn.bombs.security.LoginRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/security")
public class AuthController {

    @Autowired
    AppUserService service;

    AuthenticationManager authManager;
    JwtConverter converter;

    public AuthController(AuthenticationManager authManager, JwtConverter converter){
        this.authManager = authManager;
        this.converter = converter;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request){

        try {
            UsernamePasswordAuthenticationToken loginToken =
                    new UsernamePasswordAuthenticationToken( request.getUsername(),
                            request.getPassword());
            Authentication authResult = authManager.authenticate(loginToken);
            if( authResult.isAuthenticated() ){
                UserDetails matchingUser = service.loadUserByUsername(request.getUsername());

                String jwt = converter.getTokenFromUser( matchingUser );
                Map<String, String> fakeReturnObject = new HashMap<>();
                fakeReturnObject.put("jwt", jwt);

                return ResponseEntity.ok(fakeReturnObject);
            } else {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }


        } catch( AuthenticationException ex ){
            System.out.println(ex.getMessage());
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

}
