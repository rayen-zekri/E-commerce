package me.isetdsi.Ecommerce.service;

import me.isetdsi.Ecommerce.entity.Cart;
import me.isetdsi.Ecommerce.entity.ProductInOrder;
import me.isetdsi.Ecommerce.entity.User;

import java.util.Collection;


public interface CartService {
    Cart getCart(User user);

    void mergeLocalCart(Collection<ProductInOrder> productInOrders, User user);

    void delete(String itemId, User user);

    void checkout(User user);
}
