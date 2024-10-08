package com.example.Hair_Salon_Project.Api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@SecurityRequirement(name="api")// để sử dụng token tren swagger
public class SystemAdministratorAPI {
}
