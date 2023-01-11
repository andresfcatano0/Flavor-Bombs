package org.learn.bombs.models;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Order {

    Integer orderId;

    String orderItems;

    Integer restaurantId;

    AppUser owner;

    LocalDate orderDate;

    Integer itemQuantity;

    BigDecimal totalPrice;

    public AppUser getOwner() {
        return owner;
    }

    public void setOwner(AppUser owner) {
        this.owner = owner;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(String orderItems) {
        this.orderItems = orderItems;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Integer getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(Integer itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", orderItems='" + orderItems + '\'' +
                ", restaurantId=" + restaurantId +
                ", owner=" + owner +
                ", orderDate=" + orderDate +
                ", itemQuantity=" + itemQuantity +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
