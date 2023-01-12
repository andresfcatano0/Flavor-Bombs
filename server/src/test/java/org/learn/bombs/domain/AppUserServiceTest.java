package org.learn.bombs.domain;

import org.learn.bombs.data.UserRepo;
import org.learn.bombs.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    UserRepo repository;

//    @Test
//    void ShouldFindUser() {
//        AppUser expected = makeUser();
//        when(repository.getAppUserById(1)).thenReturn(expected);
//        String actual = service.getAppUserById(1).getPayload().getUsername();
//        assertEquals(expected.getUsername(), actual);
//    }

//    @Test
//    void ShouldDeleteUser() {
//        Result<Void> result = service.deleteAppUserById(1);
//        assertFalse(result.isSuccess());
//    }

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