package me.isetdsi.Ecommerce.repository;

import me.isetdsi.Ecommerce.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CartRepository extends JpaRepository<Cart, Integer> {
}
