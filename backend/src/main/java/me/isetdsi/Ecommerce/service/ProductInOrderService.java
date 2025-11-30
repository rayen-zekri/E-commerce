package me.isetdsi.Ecommerce.service;

import me.isetdsi.Ecommerce.entity.ProductInOrder;
import me.isetdsi.Ecommerce.entity.User;

public interface ProductInOrderService {
    void update(String itemId, Integer quantity, User user);
    ProductInOrder findOne(String itemId, User user);
}
