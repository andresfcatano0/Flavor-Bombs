package org.learn.bombs.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authorization.AuthorityAuthorizationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    private final JwtConverter converter;
    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http, AuthenticationConfiguration config) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()

                .antMatchers( HttpMethod.GET,"/api/user/*").authenticated()
                .antMatchers( HttpMethod.GET,"/api/user").hasRole("ADMIN")
                .antMatchers( HttpMethod.GET,"/api/restaurant/*").permitAll()
                .antMatchers( HttpMethod.GET,"/api/restaurant").permitAll()
                .antMatchers( HttpMethod.GET,"/api/order/all").hasRole("ADMIN")
                .antMatchers( HttpMethod.GET,"/api/order").authenticated()
                .antMatchers( HttpMethod.GET,"/api/review").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/restaurant/*").hasRole("ADMIN")
                .antMatchers( HttpMethod.DELETE, "/api/user/*").hasRole("ADMIN")
                .antMatchers( HttpMethod.DELETE, "/api/menu/*").hasRole("ADMIN")
                .antMatchers( HttpMethod.DELETE, "/api/order/*").authenticated()
                .antMatchers( HttpMethod.POST, "/api/review").authenticated()
                .antMatchers( HttpMethod.POST, "/api/order").authenticated()
                .antMatchers( HttpMethod.POST,"/api/security/login").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/*").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/review/*").authenticated()
                .and()
                .addFilter( new JwtRequestFilter(buildAuthManager(config), converter ))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return  http.build();
    }

    @Bean
    AuthenticationManager buildAuthManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();

    }

}
