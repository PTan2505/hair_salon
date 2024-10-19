package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Exception.DuplicateEntity;
import com.example.Hair_Salon_Project.Model.*;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Repository.StaffRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
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

    @Autowired
    StaffRepository staffRepository;

    public AccountResponse register(RegisterRequest registerRequest) {
        Account newAccount = modelMapper.map(registerRequest, Account.class);

        try {

            newAccount.setPassword(passwordEncoder.encode(registerRequest.getPassword()));// encode password before save
                                                                                          // to db
            accountRepository.save(newAccount);
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setAccount(newAccount);
            emailDetail.setSubject("Hello world");
            emailDetail.setLink("https://www.google.com/");
            emailService.sendEmail(emailDetail);
            return modelMapper.map(newAccount, AccountResponse.class); // JPA có sẵn : INSERT INTO account(...) VALUES
                                                                       // (....)

        } catch (Exception e) {
            if (e.getMessage().contains(newAccount.getEmail())) {
                throw new DuplicateEntity("Duplicated  email ");
            } else {
                throw new DuplicateEntity("Duplicated  phone ");
            }
        }

    }

    public AccountResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken( // xac
                                                                                                                        // thuc
                    // username , password (
                    // tu dong ma hoa password user va check tren database )
                    loginRequest.getEmail(), loginRequest.getPassword() // go to loadUserByUsername(String phone)
            // to check username in db first -> so sanh password db with request password

            ));
            // ==> account exists
            Account account = (Account) authentication.getPrincipal(); // tra ve account tu database
            AccountResponse accountResponse = modelMapper.map(account, AccountResponse.class);
            accountResponse.setToken(tokenService.generateToken(account));
            return accountResponse; // response thong tin account
        } catch (Exception e) {
            e.printStackTrace();
            throw new EntityNotFoundException("Username or password is incorrect");
        }

    }

    public List<Account> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Attempting to load user with email: " + email);

        Account account = accountRepository.findAccountByEmail(email);
        if (account == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return account;
    }

    public Account getCurrentAccount() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // phai get thong tin user tu database

        return accountRepository.findAccountById(account.getId());
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
