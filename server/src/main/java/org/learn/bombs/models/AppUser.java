package org.learn.bombs.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {
    private int appUserId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private boolean enabled;
//    private Collection<GrantedAuthority> authorities;

    List<String> roles = new ArrayList<>();

    List<Order> orders;

    List<Review> reviews;

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public AppUser(int appUserId, String firstName, String lastName, String username, String password, String email, boolean enabled, List<String> authorities) {
        this.appUserId = appUserId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = enabled;
        this.roles = authorities;
//        this.authorities = convertRolesToAuthorities(authorities);
    }

    public AppUser(){

    }

    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles){
        return roles.stream()
                .map(r-> new SimpleGrantedAuthority("ROLE_" + r))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return convertRolesToAuthorities(roles);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public int getAppUserId() {
        return appUserId;
    }


    public String getFirstName() {
        return firstName;
    }


    public String getLastName() {
        return lastName;
    }


    public String getEmail() {
        return email;
    }

    public void setAppUserId(int appUserId) {
        this.appUserId = appUserId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<String> getRoles(){
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
