package org.learn.bombs.models;

public class Order {

    Integer orderId;

    String orderItems;

    Integer AppUserId;

    Integer restaurantId;

    AppUser owner;

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

    public Integer getAppUserId() {
        return AppUserId;
    }

    public void setAppUserId(Integer appUserId) {
        AppUserId = appUserId;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", orderItems='" + orderItems + '\'' +
                ", AppUserId=" + AppUserId +
                ", restaurantId=" + restaurantId +
                '}';
    }
}
