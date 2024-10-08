package com.example.Hair_Salon_Project.Api;

import com.example.Hair_Salon_Project.Model.AccountResponse;
import com.example.Hair_Salon_Project.Model.LoginRequest;
import com.example.Hair_Salon_Project.Model.RegisterRequest;
import com.example.Hair_Salon_Project.Service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
