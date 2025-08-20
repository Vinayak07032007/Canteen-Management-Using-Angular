package com.example.Canteen;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CanteenService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Save a new menu item
    public MenuItem addMenuItem(MenuItem item) {
        if (item == null || item.getName() == null || item.getPrice() <= 0) {
            throw new IllegalArgumentException("Invalid menu item details.");
        }
        return menuRepository.save(item);
    }

    // Fetch all menu items
    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    // Save a single-item order
    public OrderItem placeOrder(OrderItem order) {
        if (order == null || order.getItemName() == null || order.getQuantity() <= 0) {
            throw new IllegalArgumentException("Invalid order details.");
        }

        // Optional: Auto-calculate total if not provided
        if (order.getTotal() <= 0) {
            // Try to find menu item by name to calculate total
            MenuItem menuItem = menuRepository.findByName(order.getItemName());
            if (menuItem == null) {
                throw new IllegalArgumentException("Menu item not found: " + order.getItemName());
            }
            double total = menuItem.getPrice() * order.getQuantity();
            order.setTotal(total);
        }

        order.setOrderTime(LocalDateTime.now());
        // userName and tableNumber are now part of OrderItem, so nothing else needed here
        return orderRepository.save(order);
    }

    // Fetch all orders
    public List<OrderItem> getAllOrders() {
        return orderRepository.findAll();
    }
}
