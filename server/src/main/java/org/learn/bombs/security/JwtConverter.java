package org.learn.bombs.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.learn.bombs.models.AppUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtConverter {

    private Key signingKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String getTokenFromUser( UserDetails details ){
        return Jwts.builder()
                .setIssuer("FLAVORBOMBS-app")
                .setSubject(details.getUsername())
                .claim( "roles", details.getAuthorities() )
                .setExpiration( new Date(System.currentTimeMillis()
                        + 15 * 60 * 1000) )
                .signWith( signingKey )
                .compact();
    }

    public UserDetails getUserFromToken( String authorizationHeader ){
//        if we cannot validate the incoming token, we'll return
//        null to indicate a failure
        AppUser user = null;

        if( authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            String jwt = authorizationHeader.substring(7);

            Jws<Claims> tokenClaims = Jwts.parserBuilder()
                    .requireIssuer("FLAVORBOMBS-app")
                    .setSigningKey( signingKey )
                    .build()
                    .parseClaimsJws( jwt );

            user = new AppUser();

            user.setUsername( tokenClaims.getBody().getSubject() );
            List<String> roles = new ArrayList<>();
            List<LinkedHashMap> authorities = tokenClaims.getBody().get("roles", List.class );
            for( LinkedHashMap<String,String> authority : authorities ){
                roles.add( authority.get("authority").substring(5));
            }

            user.setRoles( roles );
        }

        return user;
    }

}