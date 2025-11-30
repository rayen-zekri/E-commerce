package me.isetdsi.Ecommerce.service;


import me.isetdsi.Ecommerce.entity.User;

import java.util.Collection;


public interface UserService {
    User findOne(String email);

    Collection<User> findByRole(String role);

    User save(User user);
    User findOneById(Long id);

    User update(User user);
}
