package org.learn.bombs.data;

import org.learn.bombs.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAllUsers() {
        List<AppUser> appUsers = repository.getAllAppUsers();
        assertNotNull(appUsers);
        assertEquals(2, appUsers.size());
    }

    @Test
    void shouldFindUserById() {
        AppUser appUser = repository.getAppUserById(1);
        assertEquals(1, appUser.getAppUserId());
        assertEquals("johndoe", appUser.getUsername());
        assertEquals("johndoe@email.com", appUser.getEmail());
    }

    @Test
    void shouldNotFindUserById() {
        AppUser appUser = repository.getAppUserById(99);
        assertNull(appUser);
    }

    @Test
    void shouldDeleteUser() {
        repository.deleteAppUserById(1);
        AppUser appUser = repository.getAppUserById(1);
        assertNull(appUser);

        List<AppUser> appUsers = repository.getAllAppUsers();
        assertEquals(1, appUsers.size());
    }

    @Test
    void shouldNotDeleteUser() {
        repository.deleteAppUserById(99);
        AppUser appUser = repository.getAppUserById(99);
        assertNull(appUser);

        List<AppUser> appUsers = repository.getAllAppUsers();
        assertEquals(2, appUsers.size());
    }

    @Test
    void shouldUpdate() {
        AppUser appUser = makeUser();
        appUser.setAppUserId(1);
        assertTrue(repository.updateAppUser(appUser));
    }

    @Test
    void shouldNotUpdate() {
        AppUser appUser = makeUser();
        appUser.setAppUserId(99);
        assertFalse(repository.updateAppUser(appUser));
    }

    AppUser makeUser() {
        AppUser appUser = new AppUser();
        appUser.setAppUserId(1);
        appUser.setFirstName("john");
        appUser.setLastName("doe");
        appUser.setUsername("johndoe");
        appUser.setPassword("top-secret-password");
        appUser.setEmail("johndoe@email.com");
        return appUser;
    }

}