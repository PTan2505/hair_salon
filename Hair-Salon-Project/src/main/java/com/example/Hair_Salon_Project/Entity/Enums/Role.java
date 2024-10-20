package com.example.Hair_Salon_Project.Entity.Enums;

public enum Role {
    CUSTOMER("Customer"),
    STYLIST("Stylist"),
    CASHIER("Cashier"),
    MANAGER("Manager"),
    SUPER_USER("Super User");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
