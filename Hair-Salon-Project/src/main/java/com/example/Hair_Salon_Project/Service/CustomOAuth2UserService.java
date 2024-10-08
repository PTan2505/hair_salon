package com.example.Hair_Salon_Project.Service;

import com.example.Hair_Salon_Project.Entity.Account;
import com.example.Hair_Salon_Project.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service để xử lý thông tin người dùng từ Google
 */
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Lấy thông tin từ Google
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        // Kiểm tra xem người dùng đã tồn tại chưa
        Optional<Account> userOptional = Optional.ofNullable(accountRepository.findAccountByEmail(email));
        Account account;
        if (userOptional.isPresent()) {
            account = userOptional.get();
            // Cập nhật thông tin nếu cần
            account.setFirstName(firstName);
            account.setLastName(lastName);
            accountRepository.save(account);
        } else {
            // Tạo tài khoản mới
            account = new Account();
            account.setEmail(email);
            account.setFirstName(firstName);
            account.setLastName(lastName);
            // Bạn có thể đặt các trường mặc định khác như role, active, etc.
            account.setActive(true);
            accountRepository.save(account);
        }

        return oAuth2User;
    }
}
