package me.isetdsi.Ecommerce.api;

import me.isetdsi.Ecommerce.entity.User;
import me.isetdsi.Ecommerce.enums.ResultEnum;
import me.isetdsi.Ecommerce.exception.MyException;
import me.isetdsi.Ecommerce.security.JWT.JwtProvider;
import me.isetdsi.Ecommerce.service.UserService;
import me.isetdsi.Ecommerce.vo.request.LoginForm;
import me.isetdsi.Ecommerce.vo.response.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@CrossOrigin
@RestController

public class UserController {

    @Autowired
    UserService userService;


    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = (List<User>) userService.findByRole("ROLE_CUSTOMER");
        return ResponseEntity.ok(users);
    }
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginForm loginForm) {
        // throws Exception if authentication failed

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtProvider.generate(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findOne(userDetails.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwt, user.getEmail(), user.getName(), user.getRole()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u) {
        try {
            return ResponseEntity.ok(userService.save(u));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }
    }


    @PutMapping("/profile")
    public ResponseEntity<User> update(@RequestBody User user, Principal principal) {

        try {
            if (!principal.getName().equals(user.getEmail())) throw new IllegalArgumentException();
            return ResponseEntity.ok(userService.update(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getProfile(@PathVariable("email") String email, Principal principal) {
        if (principal.getName().equals(email)) {
            return ResponseEntity.ok(userService.findOne(email));
        } else {
            return ResponseEntity.badRequest().build();
        }

    }
    @PutMapping("/activate/{id}")
    public ResponseEntity<String> activateUser(@PathVariable Long id) {
        User user = userService.findOneById(id);
        if (user == null) throw new MyException(ResultEnum.USER_NOT_FOUNT);

        user.setActive(true);
        userService.update(user);
        return ResponseEntity.ok("User activated successfully");
    }

    // 3. Désactiver un utilisateur
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateUser(@PathVariable Long id) {
        User user = userService.findOneById(id);
        if (user == null) throw new MyException(ResultEnum.USER_NOT_FOUNT);

        user.setActive(false);
        userService.update(user);
        return ResponseEntity.ok("User deactivated successfully");
    }
}
