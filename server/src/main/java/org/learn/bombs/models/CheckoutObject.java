package org.learn.bombs.models;

import java.math.BigDecimal;

public class CheckoutObject {
    private String filterTags;
    private String itemDescription;
    private String itemName;
    private String itemImage;
    private BigDecimal itemPrice;
    private Integer menuId;
    private Integer restaurantId;

    private Integer quantity;

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getFilterTags() {
        return filterTags;
    }

    public void setFilterTags(String filterTags) {
        this.filterTags = filterTags;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    @Override
    public String toString() {
        return "CheckoutObject{" +
                "filterTags='" + filterTags + '\'' +
                ", itemDescription='" + itemDescription + '\'' +
                ", itemImage='" + itemImage + '\'' +
                ", itemPrice=" + itemPrice +
                ", menuId=" + menuId +
                ", restaurantId=" + restaurantId +
                '}';
    }
}
