package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.DuplicateEntity;
import com.example.Hair_Salon_Project.Exception.NotFoundException;
import com.example.Hair_Salon_Project.Model.*;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository; // ~ dao
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


    public AccountResponse register(RegisterRequest registerRequest) {
        Account newAccount = modelMapper.map(registerRequest, Account.class);
        try {
            newAccount.setPassword(passwordEncoder.encode(registerRequest.getPassword()));//encode password before save to db
            accountRepository.save(newAccount);
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setAccount(newAccount);
            emailDetail.setSubject("Hello world");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail);
            return modelMapper.map(newAccount,AccountResponse.class); // JPA có sẵn :  INSERT INTO account(...) VALUES (....)

        } catch (Exception e) {
             if (e.getMessage().contains(newAccount.getEmail())) {
                throw new DuplicateEntity("Duplicated  email ");
            } else {
                throw new DuplicateEntity("Duplicated  phone ");
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
        List<Account> accounts = accountRepository.findAll();
        return accounts;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = accountRepository.findAccountByEmail(email);
        if (account == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return account;
    }


    public Account getCurrentAccount(){
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //phai get thong tin user tu database

        return accountRepository.findAccountById(account.getId());
    }

    public AccountResponse handleGoogleLogin(String email) {
        Optional<Account> accountOptional = Optional.ofNullable(accountRepository.findByEmail(email));

        Account account;
        if (accountOptional.isPresent()) {
            // Nếu tài khoản đã tồn tại, lấy tài khoản đó
            account = accountOptional.get();
        } else {
            // Nếu chưa tồn tại, tạo tài khoản mới
            account = new Account();
            account.setEmail(email);
            // Thiết lập các thuộc tính khác như mật khẩu, tên, vai trò, v.v.
            account.setPassword("randomGeneratedPassword"); // Có thể sử dụng một mật khẩu ngẫu nhiên hoặc một cách bảo mật khác
            account.setActive(true); // Đánh dấu tài khoản là hoạt động
            // Lưu tài khoản mới vào cơ sở dữ liệu
            accountRepository.save(account);
        }

        // Tạo và trả về AccountResponse
        return new AccountResponse(account.getId(), account.getEmail(), account.getPhone());
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        Account account = accountRepository.findByEmail(request.getEmail());
        if (account == null) {
            throw new EntityNotFoundException("Email không tồn tại");
        }

        // Tạo token đặt lại mật khẩu
        String token = UUID.randomUUID().toString();
        account.setResetPasswordToken(token);
        account.setResetPasswordExpiration(LocalDateTime.now().plusHours(1)); // Token hết hạn sau 1 giờ
        accountRepository.save(account);

        // Gửi email đặt lại mật khẩu
        emailService.sendResetPasswordEmail(account, token);
    }

    // Phương thức đặt lại mật khẩu
    public void resetPassword(ResetPasswordRequest request) {
        Account account = accountRepository.findByResetPasswordToken(request.getToken());

        if (account == null || account.getResetPasswordExpiration().isBefore(LocalDateTime.now())) {
            throw new EntityNotFoundException("Token không hợp lệ hoặc đã hết hạn");
        }

        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        account.setResetPasswordToken(null); // Xóa token sau khi sử dụng
        account.setResetPasswordExpiration(null);
        accountRepository.save(account);
    }


}
