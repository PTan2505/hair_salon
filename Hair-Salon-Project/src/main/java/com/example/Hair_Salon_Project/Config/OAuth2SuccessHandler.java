package com.example.Hair_Salon_Project.Config;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler  implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = authToken.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String name = oAuth2User.getAttribute("name");

        Optional<Account> accountOptional = Optional.ofNullable(accountRepository.findAccountByEmail(email));
        Account account;
        if (accountOptional.isPresent()) {
            account = accountOptional.get();
            // Cập nhật thông tin nếu cần
        } else {
            // Tạo tài khoản mới nếu chưa tồn tại
            account = new Account();
            account.setEmail(email);
            account.setFirstName(firstName != null ? firstName : "");
            account.setLastName(lastName != null ? lastName : "");
            account.setPassword(passwordEncoder().encode("oauth2user")); // Mật khẩu không thực sự được sử dụng
            account.setActive(true);
            account.setRole(Role.CUSTOMER); // Đặt vai trò mặc định
            accountRepository.save(account);
        }

        // Tạo JWT token
        String token = tokenService.generateToken(account);

        // Redirect hoặc trả về token
        // Ví dụ: Trả về token dưới dạng JSON
        response.setContentType("application/json");
        response.getWriter().write("{\"token\":\"" + token + "\"}");
        response.getWriter().flush();
    }


    @Autowired
    @Qualifier("securityPasswordEncoder") // Sử dụng @Qualifier để chỉ định bean cụ thể
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
