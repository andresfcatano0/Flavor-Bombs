package org.learn.bombs.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends BasicAuthenticationFilter {

    JwtConverter converter;

    public JwtRequestFilter(AuthenticationManager authManager, JwtConverter converter){
        super( authManager );
        this.converter = converter;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain chain) throws IOException, ServletException {

        String authorizationHeader = request.getHeader("Authorization");

        if( authorizationHeader != null ){
            //build the user credentials

            UserDetails userInfo = converter.getUserFromToken( authorizationHeader );
            if( userInfo != null ){
                UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(
                        userInfo, null, userInfo.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication( loginToken );
            } else {
                //the token failed validation
                response.sendError(403);
            }
        }

        chain.doFilter(request, response);
    }
}