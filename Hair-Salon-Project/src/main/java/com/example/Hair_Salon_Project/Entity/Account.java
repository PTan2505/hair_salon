package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.Gender;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; // PK for Account

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Email(message = "Invalid email format")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "New password must be at least 8 characters long")
    private String password;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+([0-9]{8})\\b", message = "Invalid phone number")
    @NotBlank(message = "Phone is required")
    @Column(unique = true)
    private String phone;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "is_super_user", nullable = false)
    private boolean superUser = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false, updatable = false)
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date")
    private Date updateDate;

    private String resetPasswordToken;

    private LocalDateTime resetPasswordExpiration;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    private List<Bill> bills;

    @OneToOne(mappedBy = "account")
    @JsonIgnore
    private Staff staff;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_" + Role.CUSTOMER));// Account always has customer permission

        if (this.superUser == true) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" +
                    (Role.SUPER_USER.name())));
            authorities.add(new SimpleGrantedAuthority("ROLE_" +
                    (Role.MANAGER.name())));
            authorities.add(new SimpleGrantedAuthority("ROLE_" +
                    (Role.CASHIER.name())));
            authorities.add(new SimpleGrantedAuthority("ROLE_" +
                    (Role.STYLIST.name())));
            return authorities;
        }
        if (this.staff != null) {
            if (!this.staff.isStaff()) {
                return authorities;
            }

            Role role = this.staff.getRole();
            if (role != null) {
                if (role == Role.MANAGER) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" +
                            (Role.CASHIER.name())));
                    authorities.add(new SimpleGrantedAuthority("ROLE_" +
                            (Role.STYLIST.name())));
                } else {
                    authorities.add(new SimpleGrantedAuthority("ROLE_" +
                            (role.name())));
                }
            }
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    // Lifecycle callbacks for date fields
    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }

    // Setter for isActive, if needed
    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public Role getRole() {
        if (this.superUser == true) {
            return Role.SUPER_USER;
        }

        if (this.staff != null) {
            return this.staff.getRole();
        }

        return Role.CUSTOMER;
    }
}
