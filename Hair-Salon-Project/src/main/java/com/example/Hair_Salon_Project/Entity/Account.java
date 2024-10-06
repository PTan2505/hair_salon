package com.example.Hair_Salon_Project.Entity;

import com.example.Hair_Salon_Project.Entity.Enums.Role;
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
     long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})\\b" , message = "Invalid phone number")
    @Column(unique = true)
    private String phone;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    private String gender;
    private boolean active;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Staff staff;

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
    public String getUsername() {
        return "";
    }
}
