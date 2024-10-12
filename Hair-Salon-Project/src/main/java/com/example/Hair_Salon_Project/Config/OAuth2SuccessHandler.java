package com.example.Hair_Salon_Project.Config;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Entity.Enums.Role;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import com.example.Hair_Salon_Project.Service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TokenService tokenService;

    // Không cần inject PasswordEncoder ở đây nữa

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = authToken.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        Optional<Account> accountOptional = Optional.ofNullable(accountRepository.findByEmail(email));
        Account account;
        if (accountOptional.isPresent()) {
            account = accountOptional.get();
            account.setFirstName(firstName != null ? firstName : account.getFirstName());
            account.setLastName(lastName != null ? lastName : account.getLastName());
        } else {
            account = new Account();
            account.setEmail(email);
            account.setFirstName(firstName != null ? firstName : "");
            account.setLastName(lastName != null ? lastName : "");
            account.setPassword("oauth2user"); // Đặt tạm placeholder password cho OAuth2 user
            account.setActive(true);
            account.setRole(Role.CUSTOMER);
            accountRepository.save(account);
        }

        String token = tokenService.generateToken(account);
        response.setContentType("application/json");
        response.getWriter().write("{\"token\":\"" + token + "\"}");
        response.getWriter().flush();
    }
}
