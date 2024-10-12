package com.example.Hair_Salon_Project.Repository;

import com.example.Hair_Salon_Project.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findAccountById(Long id);

    Account findAccountByPhone(String phone);

    Account findByEmail(String email);


    Account findAccountByEmail(String email);

    Account findByResetPasswordToken(String token);
}
