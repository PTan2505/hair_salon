package com.example.Hair_Salon_Project.Entity.Enums;

public enum Role {
    STYLIST("Stylist"),
    CASHIER("Cashier"),
    MANAGER("Manager");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
