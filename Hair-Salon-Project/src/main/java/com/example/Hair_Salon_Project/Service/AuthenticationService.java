package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.DuplicateEntity;
import com.example.Hair_Salon_Project.Exception.ValidationException;
import com.example.Hair_Salon_Project.Model.*;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import jakarta.validation.ConstraintViolationException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class AuthenticationService {

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

    public LoginResponse register(RegisterRequest registerRequest) {
        // Check for existing email or phone
        if (accountRepository.existsByEmail(registerRequest.getEmail())) {
            throw new DuplicateEntity("Email already exists.");
        }

        if (accountRepository.existsByPhone(registerRequest.getPhone())) {
            throw new DuplicateEntity("Phone number already exists.");
        }

        // Map the RegisterRequest to Account
        Account newAccount = modelMapper.map(registerRequest, Account.class);
        newAccount.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Save the new account and send the email
        try {
            accountRepository.save(newAccount);

            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setAccount(newAccount);
            emailDetail.setSubject("Welcome to Our Service");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail);

            return modelMapper.map(newAccount, LoginResponse.class);
        } catch (ConstraintViolationException e) {
            String violations = e.getConstraintViolations().stream()
                    .map(violation -> "Field: " + violation.getPropertyPath() + ", Message: " + violation.getMessage())
                    .collect(Collectors.joining(", "));

            throw new ValidationException(violations);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred during registration.");
        }
    }

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Optional<Account> optionalAccount = accountRepository.findByEmail(loginRequest.getEmail());
            if (optionalAccount.isEmpty()) {
                throw new NotFoundException("Username or password is incorrect");
            }

            Account account = optionalAccount.get();
            LoginResponse LoginResponse = modelMapper.map(account, LoginResponse.class);
            LoginResponse.setToken(tokenService.generateToken(account));
            LoginResponse.setRole(account.getRole());

            return LoginResponse;
        } catch (Exception e) {
            throw new NotFoundException("Username or password is incorrect");
        }
    }

    public Account getCurrentAccount() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return account;
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        accountRepository.findByEmail(request.getEmail())
                .ifPresentOrElse(account -> {
                    String token = UUID.randomUUID().toString();
                    account.setResetPasswordToken(token);
                    account.setResetPasswordExpiration(LocalDateTime.now().plusHours(1));
                    accountRepository.save(account);
                    emailService.sendResetPasswordEmail(account, token);
                }, () -> {
                    throw new NotFoundException("Email not found");
                });
    }

    public void resetPassword(ResetPasswordRequest request) {
        accountRepository.findByResetPasswordToken(request.getToken()).ifPresentOrElse(account -> {
            account.setPassword(passwordEncoder.encode(request.getNewPassword()));
            account.setResetPasswordToken(null);
            account.setResetPasswordExpiration(null);
            accountRepository.save(account);
        }, () -> {
            throw new NotFoundException("Token not found or expired");
        });

    }

}
