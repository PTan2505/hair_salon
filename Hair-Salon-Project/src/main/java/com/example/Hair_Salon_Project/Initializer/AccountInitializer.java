package com.example.Hair_Salon_Project.Initializer;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class AccountInitializer {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @PostConstruct
    public void init() {
        try {
            loadAccounts();
            loadStaff();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadAccounts() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:data/accounts.json");
        List<Account> accounts = objectMapper.readValue(
                Files.readAllBytes(Paths.get(resource.getURI())),
                new TypeReference<List<Account>>() {
                });

        for (Account account : accounts) {
            if (!accountRepository.existsByEmail(account.getEmail())) {
                account.setPassword(passwordEncoder.encode(account.getPassword()));
                accountRepository.save(account);
            }
        }
    }

    private void loadStaff() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:data/staff.json");
        List<Staff> staffs = objectMapper.readValue(
                Files.readAllBytes(Paths.get(resource.getURI())),
                new TypeReference<List<Staff>>() {
                });

        for (Staff request : staffs) {
            if (staffRepository.findByAccountId(request.getAccount().getId()).isEmpty()) {
                Long accountId = request.getAccount().getId();
                Account account = accountRepository.findById(accountId)
                        .orElseThrow(() -> new RuntimeException("Account not found for phone: " + accountId));

                Staff staff = new Staff();
                staff.setAccount(account);
                staff.setRole(request.getRole());

                staffRepository.save(staff);
            }
        }
    }
}
