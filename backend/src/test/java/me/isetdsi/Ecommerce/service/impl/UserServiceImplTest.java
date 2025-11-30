package me.isetdsi.Ecommerce.service.impl;

import me.isetdsi.Ecommerce.entity.User;
import me.isetdsi.Ecommerce.exception.MyException;
import me.isetdsi.Ecommerce.repository.CartRepository;
import me.isetdsi.Ecommerce.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
public class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private CartRepository cartRepository;

    private User user;

    @Before
    public void setUp() {
        user = new User();
        user.setPassword("rania132");
        user.setEmail("rania@email.com");
        user.setName("rania");
        user.setPhone("1234567");
        user.setAddress("mestir");
    }

    @Test
    public void createUserTest() {
        when(userRepository.save(user)).thenReturn(user);

        userService.save(user);

        Mockito.verify(userRepository, Mockito.times(2)).save(user);
    }

    @Test(expected = MyException.class)
    public void createUserExceptionTest() {
        userService.save(user);
    }

    @Test
    public void updateTest() {
        User oldUser = new User();
        oldUser.setEmail("email@test.com");

        when(userRepository.findByEmail(user.getEmail())).thenReturn(oldUser);
        when(userRepository.save(oldUser)).thenReturn(oldUser);

        User userResult = userService.update(user);

        assertThat(userResult.getName(), is(oldUser.getName()));
    }
}
