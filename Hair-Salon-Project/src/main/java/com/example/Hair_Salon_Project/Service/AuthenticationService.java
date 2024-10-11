package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Entity.Staff;
import com.example.Hair_Salon_Project.Exception.DuplicateEntity;
import com.example.Hair_Salon_Project.Model.AccountResponse;
import com.example.Hair_Salon_Project.Model.LoginRequest;
import com.example.Hair_Salon_Project.Model.RegisterRequest;
import com.example.Hair_Salon_Project.Model.EmailDetail;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    TokenService tokenService;

    @Autowired
    EmailService emailService;

    @Autowired
    StaffRepository staffRepository;

    public AccountResponse register(RegisterRequest registerRequest) {
        Account newAccount = modelMapper.map(registerRequest, Account.class);
        try {
            newAccount.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            newAccount.setActive(true);
            accountRepository.save(newAccount);

            // New code to handle staff registration
            if (registerRequest.getRole() != null && registerRequest.getRole() == Role.STAFF) {
                Staff newStaff = new Staff();
                newStaff.setAccount(newAccount);
                newStaff.setFirstName(registerRequest.getFirstName());
                newStaff.setLastName(registerRequest.getLastName());
                newStaff.setGender(registerRequest.getGender());
                newStaff.setEmail(registerRequest.getEmail());
                newStaff.setPhone(registerRequest.getPhone());
                newStaff.setRole(registerRequest.getRole());
                newStaff.setCreateDate(registerRequest.getCreateDate());
                newStaff.setStatus(true); // Set default status or any other logic
                newStaff.setActive(true); // Set default active status
                staffRepository.save(newStaff); // Save the staff information
            }

            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setAccount(newAccount);
            emailDetail.setSubject("Hello world");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail);
            return modelMapper.map(newAccount, AccountResponse.class);
        } catch (Exception e) {
            if (e.getMessage().contains(newAccount.getEmail())) {
                throw new DuplicateEntity("Duplicated email");
            } else {
                throw new DuplicateEntity("Duplicated phone");
            }
        }
    }

    public AccountResponse login(LoginRequest loginRequest) {
        // Kiểm tra đầu vào
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            throw new IllegalArgumentException("Email and password must not be null");
        }

        try {
            // Kiểm tra xem tài khoản có tồn tại không
            Account account = accountRepository.findAccountByEmail(loginRequest.getEmail());
            if (account == null) {
                throw new EntityNotFoundException("Email not found");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
            accountResponse.setToken(tokenService.generateToken(account));
            return accountResponse;
        } catch (BadCredentialsException e) {
            throw new EntityNotFoundException("Invalid password");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Login failed due to an unexpected error");
        }
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = accountRepository.findAccountByEmail(email);
        if (account == null) {
            throw new EntityNotFoundException("User not found");
        }
        return account;
    }

    public Account getCurrentAccount() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return accountRepository.findAccountById(account.getId());
    }
}