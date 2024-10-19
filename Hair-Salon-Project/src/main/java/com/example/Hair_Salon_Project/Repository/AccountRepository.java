package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByPhone(String phone);

    Optional<Account> findByEmail(String email);

    Optional<Account> findByResetPasswordToken(String resetPasswordToken);

    boolean existsByPhone(String phone);

    boolean existsByEmail(String email);
}
