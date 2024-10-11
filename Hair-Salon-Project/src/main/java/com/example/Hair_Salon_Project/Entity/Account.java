package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class Account implements UserDetails {
    @Id// đánh dấu là primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String phone;

    private Date birthday;

    private String gender;
    private boolean active;


    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Staff staff;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Booking> bookings;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Feedback> feedbacks;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Bill> bills;

    private int point;

    @Enumerated(EnumType.STRING)
    Role role;


    public Collection<? extends GrantedAuthority> getAuthorities() { // đinh nghĩa quyền hạn account này làm đc
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if(this.role != null){
            authorities.add(new SimpleGrantedAuthority(this.role.toString()));
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

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @PrePersist
    protected void onCreate() {
        this.createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateDate = new Date();
    }

}
