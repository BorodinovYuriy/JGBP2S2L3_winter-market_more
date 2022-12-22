package ru.gb.spring.wintermarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.spring.wintermarket.entity.OrderItem;
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
