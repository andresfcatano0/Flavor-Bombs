package org.learn.bombs.models;

import java.math.BigDecimal;

public class Menu {

    private int menuId;
    private String itemName;
    private String itemDescription;
    private BigDecimal itemPrice;
    private int restaurantId;

    private String itemImage;

    private String filterTags;

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public BigDecimal getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(BigDecimal itemPrice) {
        this.itemPrice = itemPrice;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getFilterTags() {
        return filterTags;
    }

    public void setFilterTags(String filterTags) {
        this.filterTags = filterTags;
    }
}
