package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Model.*;
import com.example.Hair_Salon_Project.Service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/")
@SecurityRequirement(name="api")// để sử dụng token tren swagger
public class AuthenticationAPI {
    @Autowired
    AuthenticationService authenticationService;
    @Operation(summary = "Register a new account", description = "Register a new user account")
    @PostMapping("register")
    public ResponseEntity<AccountResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AccountResponse newAccount = authenticationService.register(registerRequest);
        return ResponseEntity.ok(newAccount);
    }

    @Operation(summary = "User login", description = "Authenticate user and return JWT token")
    @PostMapping("login")
    public ResponseEntity<AccountResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AccountResponse accountResponse = authenticationService.login(loginRequest);
        return ResponseEntity.ok(accountResponse);
    }
    @Operation(summary = "Google OAuth2 login", description = "Handle Google OAuth2 login and return JWT token")
    @GetMapping("/oauth2/redirect/google")
   public ResponseEntity<AccountResponse> oauth2Google(OAuth2AuthenticationToken authentication) {
        OAuth2User user = authentication.getPrincipal();
        String email = user.getAttribute("email");

        // Xử lý tài khoản người dùng: kiểm tra xem người dùng đã tồn tại chưa,
        // nếu chưa thì có thể tạo tài khoản mới hoặc xử lý theo cách bạn muốn.
        AccountResponse accountResponse = authenticationService.handleGoogleLogin(email);

        return ResponseEntity.ok(accountResponse);
    }



    @Operation(summary = "Request password reset", description = "Send a password reset email to the user")
    @PostMapping("forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authenticationService.forgotPassword(request);
        return ResponseEntity.ok("Một email đã được gửi để đặt lại mật khẩu của bạn.");
    }

    @Operation(summary = "Reset password", description = "Reset user's password using the token sent via email")
    @PostMapping("reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authenticationService.resetPassword(request);
        return ResponseEntity.ok("Mật khẩu của bạn đã được cập nhật thành công.");
    }


}
