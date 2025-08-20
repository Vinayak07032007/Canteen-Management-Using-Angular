package com.example.Canteen;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuItem, Long> {
    MenuItem findByName(String name); // this enables name-based lookup
}
