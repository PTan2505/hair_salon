package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Enums.Gender;
import com.example.Hair_Salon_Project.Model.AccountUpdateRequest;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class CustomerAccountApi {

    @Autowired
    private AccountRepository accountRepository;

    // Retrieve account by ID (for customer)
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update account (for customer)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Long id, @RequestBody AccountUpdateRequest accountUpdateRequest) {
        Optional<Account> optionalAccount = accountRepository.findById(id);

        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setFirstName(accountUpdateRequest.getFirstName());
            account.setLastName(accountUpdateRequest.getLastName());
            account.setPhone(accountUpdateRequest.getPhone());

            // Kiểm tra và chuyển đổi giá trị gender an toàn
            if (accountUpdateRequest.getGender() != null) {
                try {
                    Gender gender = Gender.valueOf(accountUpdateRequest.getGender());
                    account.setGender(gender);
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid gender value. Allowed values: Male, Female");
                }
            }

            if (accountUpdateRequest.getBirthday() != null) {
                account.setBirthDate(accountUpdateRequest.getBirthday().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate());
            }

            accountRepository.save(account);
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
